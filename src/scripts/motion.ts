/**
 * Movimiento del sitio con Motion (https://motion.dev).
 * Usa la versión "mini" de animate (sobre Web Animations API, ~2,5 KB) e inView.
 * - [data-reveal]: aparición al entrar en pantalla (opcional data-delay en segundos).
 * - [data-reveal-group]: aparición escalonada de sus hijos directos.
 * - [data-rise]: bolsas del hero que suben al cargar (solo transform: no retrasa el LCP).
 * - [data-parallax]: desplaza la textura de curvas de nivel al hacer scroll.
 * - [data-tilt]: inclinación sutil de las bolsas con el puntero.
 * Respeta prefers-reduced-motion: si está activo, no se anima nada.
 */
import { animate } from 'motion/mini';
import { inView } from 'motion';

declare global {
  interface Window { __smMotion?: boolean }
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = [0.22, 1, 0.36, 1] as const;
const entrada = { opacity: [0, 1], transform: ['translate3d(0,28px,0)', 'translate3d(0,0,0)'] };

if (!reduce) {
  window.__smMotion = true;

  // Apariciones simples
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    inView(el, () => {
      animate(el, entrada, { duration: 0.9, delay: Number(el.dataset.delay ?? 0), ease }).finished.then(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, { margin: '0px 0px -10% 0px' });
  });

  // Grupos escalonados
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((grupo) => {
    const hijos = Array.from(grupo.children) as HTMLElement[];
    hijos.forEach((h) => { h.style.opacity = '0'; });
    inView(grupo, () => {
      hijos.forEach((h, i) => {
        animate(h, entrada, { duration: 0.8, delay: i * 0.08, ease }).finished.then(() => {
          h.style.opacity = '1';
          h.style.transform = 'none';
        });
      });
    }, { margin: '0px 0px -10% 0px' });
  });

  // Bolsas del hero, desde el centro hacia afuera
  const bolsas = Array.from(document.querySelectorAll<HTMLElement>('[data-rise]'));
  const centro = (bolsas.length - 1) / 2;
  bolsas.forEach((b, i) => {
    animate(b, { transform: ['translate3d(0,60px,0)', 'translate3d(0,0,0)'] }, { duration: 1.4, delay: Math.abs(i - centro) * 0.09, ease });
  });

  // Parallax de curvas de nivel: solo se calcula para las secciones visibles.
  const visibles = new Set<HTMLElement>();
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? visibles.add(e.target as HTMLElement) : visibles.delete(e.target as HTMLElement)));
  });
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => io.observe(el));
  let pendiente = false;
  const actualizar = () => {
    pendiente = false;
    const vh = window.innerHeight;
    visibles.forEach((el) => {
      const r = el.getBoundingClientRect();
      const progreso = (vh - r.top) / (vh + r.height); // 0 al entrar, 1 al salir
      el.style.setProperty('--parallax', `${((progreso - 0.5) * Number(el.dataset.parallax ?? 80)).toFixed(1)}px`);
    });
  };
  window.addEventListener('scroll', () => {
    if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
  }, { passive: true });

  // Inclinación con el puntero (solo dispositivos con hover)
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
      });
      el.addEventListener('pointerleave', () => {
        animate(el, { transform: 'perspective(900px) rotateY(0deg) rotateX(0deg)' }, { duration: 0.6, ease });
      });
    });
  }
}
