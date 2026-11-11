/**
 * Selector de pedido: presentación y cantidad → enlace de WhatsApp prellenado.
 * El enlace ya funciona sin JavaScript (cantidad 1); este script solo lo actualiza.
 * Marcado esperado: <form data-pedido data-producto data-mensaje='{...}'> con
 * input[name=presentacion], input[name=cantidad], [data-cantidad-menos|mas] y a[data-pedido-enlace].
 */
import { waPedido, type MensajePedido } from '@/lib/whatsapp';

const MIN = 1;
const MAX = 24;

document.querySelectorAll<HTMLFormElement>('form[data-pedido]').forEach((form) => {
  const enlace = form.querySelector<HTMLAnchorElement>('a[data-pedido-enlace]');
  const cantidad = form.querySelector<HTMLInputElement>('input[name="cantidad"]');
  const producto = form.dataset.producto ?? '';
  const mensaje = JSON.parse(form.dataset.mensaje ?? '{}') as MensajePedido;
  if (!enlace || !cantidad) return;

  const actualizar = () => {
    const n = Math.min(MAX, Math.max(MIN, Math.round(Number(cantidad.value) || MIN)));
    cantidad.value = String(n);
    const presentacion = form.querySelector<HTMLInputElement>('input[name="presentacion"]:checked')?.value
      ?? form.querySelector<HTMLInputElement>('input[name="presentacion"]')?.value ?? '';
    enlace.href = waPedido({ producto, presentacion, cantidad: n }, mensaje);
  };

  form.querySelector('[data-cantidad-menos]')?.addEventListener('click', () => { cantidad.value = String(Number(cantidad.value) - 1); actualizar(); });
  form.querySelector('[data-cantidad-mas]')?.addEventListener('click', () => { cantidad.value = String(Number(cantidad.value) + 1); actualizar(); });
  form.addEventListener('input', actualizar);
  form.addEventListener('change', actualizar);
  // Enter dentro del formulario abre WhatsApp en lugar de recargar la página.
  form.addEventListener('submit', (e) => { e.preventDefault(); actualizar(); window.open(enlace.href, '_blank', 'noopener'); });
  actualizar();
});
