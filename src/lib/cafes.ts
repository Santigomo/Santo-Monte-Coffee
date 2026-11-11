/** Utilidades para leer y presentar los cafés de la colección. */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';
import { useTranslations } from '@/i18n/utils';
import type { MensajePedido } from './whatsapp';

export type Cafe = CollectionEntry<'cafes'>;

/** Cafés publicados, en el orden de la guía. */
export async function getCafes(): Promise<Cafe[]> {
  const cafes = await getCollection('cafes', ({ data }) => data.publicado);
  return cafes.sort((a, b) => a.data.orden - b.data.orden);
}

/** "Pacamara Amarillo natural" / "Natural Pacamara Amarillo". */
export function nombreCafe(cafe: Cafe, lang: Lang): string {
  const t = useTranslations(lang);
  const proceso = t(`proceso.${cafe.data.proceso}`);
  return lang === 'es'
    ? `${cafe.data.variedad.es} ${proceso.toLowerCase()}`
    : `${proceso} ${cafe.data.variedad.en}`;
}

/** Textos traducidos para el mensaje de WhatsApp. */
export function mensajePedido(lang: Lang): MensajePedido {
  const t = useTranslations(lang);
  return {
    hola: t('wa.hola'),
    etiquetaCafe: t('wa.cafe'),
    etiquetaPresentacion: t('wa.presentacion'),
    etiquetaCantidad: t('wa.cantidad'),
    cierre: t('wa.cierre'),
  };
}
