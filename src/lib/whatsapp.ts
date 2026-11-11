/**
 * Construcción de enlaces de WhatsApp con mensaje prellenado.
 * Se usa en el servidor (enlace por defecto, funciona sin JavaScript)
 * y en el navegador (actualiza el enlace al cambiar presentación o cantidad).
 */
import site from '@/data/site.json';

export const WHATSAPP_NUMBER: string = site.whatsapp;

/** Textos del mensaje, ya traducidos. */
export interface MensajePedido {
  hola: string;
  etiquetaCafe: string;
  etiquetaPresentacion: string;
  etiquetaCantidad: string;
  cierre: string;
}

export interface Pedido {
  producto: string;
  presentacion: string;
  cantidad: number;
}

/** Enlace wa.me con cualquier texto. */
export function waLink(texto: string, numero: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

/** Texto del pedido de un producto. */
export function textoPedido(p: Pedido, m: MensajePedido): string {
  return [
    m.hola,
    `• ${m.etiquetaCafe}: ${p.producto}`,
    `• ${m.etiquetaPresentacion}: ${p.presentacion}`,
    `• ${m.etiquetaCantidad}: ${p.cantidad}`,
    '',
    m.cierre,
  ].join('\n');
}

/** Enlace de pedido de un producto. */
export function waPedido(p: Pedido, m: MensajePedido): string {
  return waLink(textoPedido(p, m));
}
