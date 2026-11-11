// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** Dominio de producción. Se usa para canonical, Open Graph y sitemap. */
const SITE = 'https://santomontecoffee.online';

export default defineConfig({
  site: SITE,
  // Cloudflare Pages sirve /ruta/index.html: las URL canónicas terminan en "/".
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO', en: 'en' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  image: {
    // Formatos modernos; los tamaños se definen en cada componente.
    responsiveStyles: false,
  },
  vite: { plugins: [tailwindcss()] },
});
