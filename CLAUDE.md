# CLAUDE.md · Santo Monte

Guía de decisiones del sitio web de **Santo Monte · Café de altura y especialidad**. Mantener actualizado con cada cambio relevante.

## Qué es

- Vitrina de marca estática. **No** hay pagos, carrito, cuentas ni base de datos.
- Los pedidos se hacen por **WhatsApp** (`wa.me/573028411167`) con un mensaje prellenado que incluye producto, presentación y cantidad. Instagram (@santomontecoffee) queda como canal secundario.
- Dominio de producción: `https://santomontecoffee.online`. Despliegue: Cloudflare Pages.

## Decisiones de contenido (confirmadas con el dueño)

| Tema | Decisión |
|---|---|
| Presentaciones | Solo **250 g**. La bolsa de 500 g del Caturra no se publica. |
| Precios | **No se muestran.** En su lugar: «Pregunta por el tuyo» / «Ask about yours». |
| Fechas | **No se muestran fechas** (ni de tostión ni de lote). Por eso no se usan las láminas de bitácoras, que llevan la fecha en la barra superior. |
| Kits | V60 y prensa francesa **aún no se venden**: se muestran como «Próximamente» con botón de aviso por WhatsApp (`disponible: false`). |
| Aprende | Sí: página con las 6 lecciones de «La montaña no miente» y las recetas de V60 y blend. |
| Logo del menú | Ojo versión *sticker* (mejor en tamaños pequeños) + wordmark original, ambos en SVG. |
| Ombligón | No se publica. |
| Idiomas | Español (por defecto, sin prefijo) e inglés (`/en/`). |

## Stack

- **Astro 7** (salida estática) + **TypeScript estricto**.
- **Tailwind CSS v4** vía `@tailwindcss/vite`. Tokens de marca en `@theme` (`src/styles/global.css`).
- **Motion** (`motion/mini` + `inView`, ~12 KB de JS en total) para animaciones. Todo respeta `prefers-reduced-motion`.
- **Content Collections** con esquemas Zod para cafés, kits y lecciones (JSON).
- **astro:assets** (sharp) para imágenes: AVIF con respaldo WebP, `srcset` y carga diferida.
- `@astrojs/sitemap` para el sitemap. JSON-LD hecho a mano.
- Transiciones entre páginas con View Transitions nativas de CSS (`@view-transition`), sin JS.

## Estructura

```
assets/                 Fuente de marca (NO editar; las imágenes se importan desde aquí)
public/                 Se sirve tal cual: fuentes, favicon, OG, SVG de marca optimizados,
                        _headers y _redirects (Cloudflare), robots.txt
scripts/optimize-svg.mjs  Copia y optimiza logos/texturas de assets/ a public/brand/
src/
  content.config.ts     Esquemas de las colecciones
  content/cafes/*.json  Un archivo por café
  content/kits/*.json   Kits (disponible: false = Próximamente)
  content/lecciones/*.json  Lecciones de «La montaña no miente»
  data/site.json        WhatsApp, Instagram, dominio
  data/lote.json        Productor, finca, origen, altura
  data/recetas.ts       Recetas de las bitácoras (bilingüe)
  i18n/ui.ts            Textos de interfaz y rutas traducidas
  i18n/utils.ts         Traducción y rutas
  lib/cafes.ts          Lectura y nombres de cafés, textos del mensaje
  lib/whatsapp.ts       Construcción de enlaces wa.me
  layouts/BaseLayout.astro
  components/brand/     Logo, Topbar (firma), FichaLote
  components/product/   Bolsa, CafeCard, PedidoWhatsApp
  components/sections/  Secciones de la home y reutilizables
  components/pages/     Páginas completas que reciben `lang`
  pages/                Rutas ES y /en/ (archivos finos que usan components/pages)
  scripts/motion.ts     Animaciones
  scripts/pedido.ts     Actualiza el enlace de WhatsApp al cambiar presentación/cantidad
  styles/global.css     Fuentes, tokens, utilidades y componentes de marca
```

## Mapa del sitio

| ES | EN |
|---|---|
| `/` | `/en/` |
| `/cafes/` | `/en/coffees/` |
| `/cafes/[id]/` | `/en/coffees/[id]/` |
| `/origen/` | `/en/origin/` |
| `/aprende/` | `/en/learn/` |
| `/404` | — |

El `id` de cada café es el nombre del archivo JSON (p. ej. `caturra-lavado`).

## Identidad visual («Vigilia Mineral»)

- Sobria, melancólica, brutalista, con un toque de vidrio.
- Paleta: negro tierra `#0E0D0B`, verde monte `#2F3B2A`, musgo `#5E6B4E`, crema de café `#D9C3A0`, crema leche `#EFE6D6`, papel `#F7F1E6`. El musgo no se usa para texto sobre fondos oscuros (contraste).
- Tipografía: Archivo Condensed Black en mayúsculas (`sm-display`), proceso en contorno (`sm-contorno`), Gloock para variedades y citas (`sm-serif`), Space Mono para texto (`body`, `sm-etiqueta`), Nothing You Could Do para notas a mano (`sm-mano`).
- Firma: barra superior `SANTO MONTE | sección | navegación` (sin barra inferior), líneas de 1,5 px (`--rule`), curvas de nivel y grilla, radio de 2 px.
- Fondos con color de texto automático: `sm-bg-negro`, `sm-bg-verde`, `sm-bg-leche`, `sm-bg-papel`. Textura: `sm-textura` con la variable `--textura`.
- Bolsas: siempre completas, recortadas y con sombra (`Bolsa.astro`). Nunca recortes cuadrados.
- Logo: siempre los archivos originales. `-crema` sobre oscuro, `-oscuro` sobre claro.

## Animación y accesibilidad

- Un script inline añade `.sm-motion` a `<html>` solo si no hay movimiento reducido. Si el módulo de Motion no carga en 2,5 s, se quita y todo queda visible.
- `[data-reveal]`, `[data-reveal-group]`, `[data-rise]`, `[data-parallax]`, `[data-tilt]` (ver `src/scripts/motion.ts`).
- El hero no oculta texto al cargar (las bolsas solo se mueven con transform), para no retrasar el LCP.
- HTML semántico, enlace «Saltar al contenido», foco visible, menú móvil con `aria-expanded`, Escape y foco atrapado.
- Texto mínimo de 12 px.

## SEO

- `SEO.astro`: title, description, canonical, hreflang (es, en, x-default), Open Graph y Twitter.
- JSON-LD: `Organization` (todas las páginas), `WebSite` (inicio), `ItemList` (cafés), `Product` + `BreadcrumbList` (ficha), `Place` (origen), `Article` (aprende).
- `Product` va sin `offers` a propósito, porque no se publican precios. Google no mostrará el fragmento enriquecido de precio; los datos de producto siguen siendo válidos.
- La imagen OG de cada ficha se genera desde la foto del café (1200×630).

## Rendimiento (Lighthouse móvil, servidor local)

Inicio 93 · Ficha 94 · Origen 96 · Cafés 92 en rendimiento; 98–100 en accesibilidad, buenas prácticas y SEO.

## Convenciones

- Código y comentarios en español; nombres de componentes en PascalCase.
- Commits pequeños, descriptivos, en español.
- Textos nuevos: siempre en `es` y `en`.
- `npm run build` ejecuta `astro check` antes de compilar: no debe haber errores de tipos.

## Pendientes y posibles mejoras

- Agregar fotos y contenido reales de los kits cuando existan; cambiar `disponible` a `true`.
- Si se vuelven a publicar precios: añadir `precio` al esquema y `offers` al JSON-LD.
- Revisar las traducciones al inglés de las notas de cata.
