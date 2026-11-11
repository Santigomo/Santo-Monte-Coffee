/**
 * Copia y optimiza los SVG de marca desde assets/ hacia public/brand/.
 * Elimina metadatos (c2pa) y reduce la precisión de los trazados.
 * Uso: npm run optimize:svg  (solo hace falta si cambian los logos o texturas).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { optimize } from 'svgo';

const files = [
  ['assets/logo/svg/santo-monte-ojo-sticker-crema.svg', 'ojo-sticker-crema.svg'],
  ['assets/logo/svg/santo-monte-ojo-sticker-oscuro.svg', 'ojo-sticker-oscuro.svg'],
  ['assets/logo/svg/santo-monte-ojo-crema.svg', 'ojo-crema.svg'],
  ['assets/logo/svg/santo-monte-ojo-oscuro.svg', 'ojo-oscuro.svg'],
  ['assets/logo/svg/santo-monte-wordmark-crema.svg', 'wordmark-crema.svg'],
  ['assets/logo/svg/santo-monte-wordmark-oscuro.svg', 'wordmark-oscuro.svg'],
  ['assets/logo/svg/santo-monte-logo-vertical-crema.svg', 'logo-vertical-crema.svg'],
  ['assets/logo/svg/santo-monte-logo-vertical-oscuro.svg', 'logo-vertical-oscuro.svg'],
  ['assets/texturas/curvas-de-nivel-crema.svg', 'curvas-crema.svg'],
  ['assets/texturas/curvas-de-nivel-crema-vertical.svg', 'curvas-crema-vertical.svg'],
  ['assets/texturas/curvas-de-nivel-negro.svg', 'curvas-negro.svg'],
  ['assets/texturas/curvas-de-nivel-musgo.svg', 'curvas-musgo.svg'],
  ['assets/texturas/grilla-1-5px-crema.svg', 'grilla-crema.svg'],
  ['assets/texturas/grilla-1-5px-negro.svg', 'grilla-negro.svg'],
];

mkdirSync('public/brand', { recursive: true });
for (const [src, out] of files) {
  const input = readFileSync(src, 'utf8');
  const { data } = optimize(input, {
    multipass: true,
    floatPrecision: 1,
    plugins: ['preset-default', 'removeMetadata'],
  });
  const clean = data.replace(/\s*xmlns:c2pa="[^"]*"/g, '');
  writeFileSync(`public/brand/${out}`, clean);
  console.log(`${out}: ${(input.length / 1024).toFixed(0)} KB → ${(clean.length / 1024).toFixed(0)} KB`);
}
