/**
 * Recetas de las bitácoras (V60 y blend). Textos bilingües.
 * Fuente: assets/textos/bitacora-v60-texto.txt y bitacora-blends-texto.txt.
 */
import type { Lang } from '@/i18n/ui';

type T = Record<Lang, string>;
export interface Receta {
  id: string;
  titulo: T;
  bajada: T;
  cafe: T;
  datos: { valor: string; etiqueta: T }[];
  pasos: { tiempo: string; texto: T }[];
  cierre: T;
}

export const recetas: Receta[] = [
  {
    id: 'v60',
    titulo: { es: 'Bitácora V60', en: 'V60 logbook' },
    bajada: {
      es: 'Mismo café. Misma molienda. Dos tazas distintas. Solo cambié en cuántas partes serví el agua: con cuatro, la taza subió de 82 a 85 puntos.',
      en: 'Same coffee. Same grind. Two different cups. I only changed how many pours I used: with four, the cup went from 82 to 85 points.',
    },
    cafe: { es: 'Borbón Rosado lavado', en: 'Washed Pink Bourbon' },
    datos: [
      { valor: '15 g', etiqueta: { es: 'Café', en: 'Coffee' } },
      { valor: '225 g', etiqueta: { es: 'Agua · 1:15', en: 'Water · 1:15' } },
      { valor: '87 °C', etiqueta: { es: 'Temperatura', en: 'Temperature' } },
      { valor: '47', etiqueta: { es: 'Clics · BN-02H', en: 'Clicks · BN-02H' } },
      { valor: '4', etiqueta: { es: 'Partes de agua', en: 'Pours' } },
      { valor: '3:20', etiqueta: { es: 'Tiempo total', en: 'Total time' } },
    ],
    pasos: [
      { tiempo: '0:00', texto: { es: 'Bloom con 50 g de agua.', en: 'Bloom with 50 g of water.' } },
      { tiempo: '0:30', texto: { es: 'Sirve hasta 150 g.', en: 'Pour up to 150 g.' } },
      { tiempo: '1:30', texto: { es: 'Sirve hasta 185 g.', en: 'Pour up to 185 g.' } },
      { tiempo: '2:10', texto: { es: 'Sirve hasta 225 g.', en: 'Pour up to 225 g.' } },
      { tiempo: '3:20', texto: { es: 'Listo. Déjalo enfriar un poco: todo sube.', en: 'Done. Let it cool a little: everything opens up.' } },
    ],
    cierre: { es: 'Guárdala para tu próxima taza.', en: 'Save it for your next cup.' },
  },
  {
    id: 'blend',
    titulo: { es: 'Bitácora de blends', en: 'Blend logbook' },
    bajada: {
      es: 'Mezclé dos cafés en cinco proporciones. El 50/50 fue el peor: los dos cafés se pelearon en vez de sumar. Ganó el 60/40, con 87 puntos: durazno y melcocha.',
      en: 'I blended two coffees in five ratios. 50/50 was the worst: the two fought instead of adding up. 60/40 won with 87 points: peach and taffy.',
    },
    cafe: { es: '60 % Pacamara Amarillo lavado · 40 % Borbón Rosado lavado', en: '60% washed Pacamara Amarillo · 40% washed Pink Bourbon' },
    datos: [
      { valor: '12 g', etiqueta: { es: 'Pacamara', en: 'Pacamara' } },
      { valor: '8 g', etiqueta: { es: 'Borbón Rosado', en: 'Pink Bourbon' } },
      { valor: '300 g', etiqueta: { es: 'Agua · 1:15', en: 'Water · 1:15' } },
      { valor: '90 °C', etiqueta: { es: 'Temperatura', en: 'Temperature' } },
      { valor: '47', etiqueta: { es: 'Clics', en: 'Clicks' } },
      { valor: '3:00', etiqueta: { es: 'Tiempo total', en: 'Total time' } },
    ],
    pasos: [
      { tiempo: '0:00', texto: { es: 'Bloom con 60 g hasta 0:35.', en: 'Bloom with 60 g until 0:35.' } },
      { tiempo: '0:35', texto: { es: 'Sirve hasta 150 g antes de 1:20.', en: 'Pour up to 150 g by 1:20.' } },
      { tiempo: '1:20', texto: { es: 'Sirve hasta 250 g antes de 2:10.', en: 'Pour up to 250 g by 2:10.' } },
      { tiempo: '2:10', texto: { es: 'Completa 300 g.', en: 'Finish at 300 g.' } },
      { tiempo: '3:00', texto: { es: 'Listo. Mejora mucho al enfriarse.', en: 'Done. It gets much better as it cools.' } },
    ],
    cierre: { es: '¿Qué proporción probarías tú?', en: 'Which ratio would you try?' },
  },
];

/** Brújula de extracción: qué mover si la taza no te convence. */
export const brujula: { sintoma: T; ajuste: T }[] = [
  { sintoma: { es: 'Agria', en: 'Sour' }, ajuste: { es: 'Muele más fino', en: 'Grind finer' } },
  { sintoma: { es: 'Amarga', en: 'Bitter' }, ajuste: { es: 'Muele más grueso', en: 'Grind coarser' } },
  { sintoma: { es: 'Pesada', en: 'Heavy' }, ajuste: { es: 'Más agua', en: 'More water' } },
  { sintoma: { es: 'Aguada', en: 'Watery' }, ajuste: { es: 'Más café', en: 'More coffee' } },
];
