/**
 * Movimiento del sitio con Motion (https://motion.dev), cargado como módulo diferido.
 * - [data-reveal]: aparición al entrar en pantalla (opcional data-delay en segundos).
 * - [data-reveal-group]: aparición escalonada de sus hijos directos.
 * - [data-rise]: bolsas del hero que suben al cargar.
 * - [data-parallax]: desplaza la textura de curvas de nivel al hacer scroll.
 * Respeta prefers-reduced-motion: si está activo, no se anima nada.
 */
import { animate, inView, scroll, stagger } from 'motion';

declare global {
  interface Window { __smMotion?: boolean }
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = [0.22, 1, 0.36, 1] as const;

function revelar(el: Element, delay = 0) {
  animate(el, { opacity: [0, 1], transform: ['translate3d(0,28px,0)', 'translate3d(0,0,0)'] }, { duration: 0.9, delay, ease });
}

if (!reduce) {
  window.__smMotion = true;

  // Apariciones simples
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    inView(el, () => revelar(el, Number(el.dataset.delay ?? 0)), { margin: '0px 0px -10% 0px' });
  });

  // Grupos escalonados
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((grupo) => {
    const hijos = Array.from(grupo.children) as HTMLElement[];
    hijos.forEach((h) => { h.style.opacity = '0'; });
    inView(grupo, () => {
      animate(hijos, { opacity: [0, 1], transform: ['translate3d(0,32px,0)', 'translate3d(0,0,0)'] }, { duration: 0.8, delay: stagger(0.08), ease });
    }, { margin: '0px 0px -10% 0px' });
  });

  // Bolsas del hero: solo transform (no ocultan nada, así no retrasan el LCP)
  const bolsas = document.querySelectorAll<HTMLElement>('[data-rise]');
  if (bolsas.length) {
    animate(bolsas, { transform: ['translate3d(0,60px,0)', 'translate3d(0,0,0)'] }, { duration: 1.4, delay: stagger(0.09, { from: 'center' }), ease });
  }

  // Parallax de curvas de nivel
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const rango = Number(el.dataset.parallax ?? 80);
    scroll((p: number) => { el.style.setProperty('--parallax', `${(p - 0.5) * rango}px`); }, { target: el, offset: ['start end', 'end start'] });
  });

  // Inclinación sutil de las bolsas al pasar el puntero (solo dispositivos con hover)
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        animate(el, { transform: `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translate3d(0,-6px,0)` }, { duration: 0.4, ease });
      });
      el.addEventListener('pointerleave', () => {
        animate(el, { transform: 'perspective(900px) rotateY(0deg) rotateX(0deg) translate3d(0,0,0)' }, { duration: 0.6, ease });
      });
    });
  }
}
