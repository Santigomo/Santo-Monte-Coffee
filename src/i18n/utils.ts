import { defaultLang, routes, ui, type Lang, type RouteKey, type UIKey } from './ui';

/** Normaliza el locale que entrega Astro a uno de los idiomas del sitio. */
export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : defaultLang;
}

/** Devuelve la función de traducción para un idioma. */
export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Ruta de una página en el idioma indicado. */
export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** Ruta de la ficha de un café. */
export function cafePath(slug: string, lang: Lang): string {
  return `${routes.cafes[lang]}${slug}/`;
}

/** Formatea la altura con separador de miles según el idioma. */
export function formatAltura(msnm: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US').format(msnm);
}
