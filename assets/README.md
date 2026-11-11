# Santo Monte · assets para la página web

Todo el material gráfico de la marca, listo para usar en la web. Abre `index.html` en el navegador para ver el catálogo completo con la paleta, las fuentes y cada archivo.

**Marca:** Santo Monte · Café de altura y especialidad · @santomontecoffee
**Estilo:** "Vigilia Mineral": sobrio, melancólico y brutalista, con un toque de vidrio.

---

## Cómo usarlo en el proyecto

1. Copia la carpeta `assets/` a la raíz pública del sitio (por ejemplo `public/assets/` en Vite, Next o Astro).
2. Enlaza la hoja de marca: `<link rel="stylesheet" href="/assets/css/santo-monte.css">`
3. En el `<head>`:

```html
<link rel="icon" href="/assets/favicon/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<meta name="theme-color" content="#2F3B2A">
<meta property="og:image" content="https://TU-DOMINIO/assets/og/og-image-1200x630.jpg">
<meta property="og:title" content="Santo Monte · Café de altura y especialidad">
```

---

## Estructura

| Carpeta | Contenido |
|---|---|
| `css/` | `santo-monte.css` (fuentes, variables de color, tipografía y componentes) y `tokens.json` |
| `data/` | `productos.json`: los 5 cafés del Lote 1 con notas, precios vigentes (21 oct 2026) y rutas de imagen |
| `fonts/` | Archivo (variable), Space Mono, Gloock y Nothing You Could Do en woff2, con licencia OFL |
| `logo/svg/` | Logo original en vector. `-crema` para fondo oscuro y `-oscuro` para fondo claro |
| `logo/png/` | Los mismos en PNG transparente a 512, 1024 y 2048 px |
| `logo/sobre-fondo/` | Logo sobre verde, negro, crema y papel (2000 × 2000) y las cartas originales |
| `favicon/` | `.ico`, `.svg`, PNG de 16 a 512, ícono enmascarable y `site.webmanifest` |
| `og/` | Imagen para compartir en WhatsApp y redes: 1200 × 630 y cuadrada de 1080 |
| `productos/` | Bolsas completas recortadas con fondo transparente. WebP a 1600, 1000 y 600 px de alto, más PNG fuente |
| `fotos/producto/` | 15 fotos de las bolsas, sacadas de las RAW (CR3). JPG de 2400 px y WebP de 1600 y 800 |
| `fotos/proceso/` | Granos, molino, sticker y V60 |
| `fotos/ambiente/` | Catando frente a la montaña |
| `fotos/editadas/` | Granos, manos y atardecer ya graduados (del post Lote 1) |
| `video/clips/` | 8 tomas sin audio para fondos o hero. Las verticales ya están rotadas. MP4 1080p y 720p |
| `video/reels/` | Reel Lote 1, Reel CityU y Vlog Feria, con audio |
| `video/posters/` | Primer cuadro de cada video, para usar como `poster=""` |
| `piezas/` | Todo lo publicado en WebP: Lote 1, Precios v3, contenido de octubre (ES y EN), bitácoras V60 y Blends, eventos y portadas |
| `stickers/` | Stickers de 5 cm (Sello y Ficha en Monte, Noche y Café, más el verde circular). SVG y WebP |
| `texturas/` | Curvas de nivel en SVG (crema, musgo y negro), grilla de 1,5 px y fondos listos en WebP de 2560 px |
| `textos/` | Textos y calendario de octubre y textos de las bitácoras, para sacar copy |

---

## Paleta

| Nombre | Hex | Variable CSS |
|---|---|---|
| Negro tierra | `#0E0D0B` | `--sm-negro-tierra` |
| Verde monte | `#2F3B2A` | `--sm-verde-monte` |
| Musgo | `#5E6B4E` | `--sm-musgo` |
| Crema de café | `#D9C3A0` | `--sm-crema-cafe` |
| Crema leche | `#EFE6D6` | `--sm-crema-leche` |
| Papel | `#F7F1E6` | `--sm-papel` |

## Tipografía

| Uso | Fuente | En CSS |
|---|---|---|
| Titulares | Archivo Condensed Black (Archivo variable, ancho 62 %, peso 900) | `.sm-display` |
| Proceso en contorno | La misma, solo con trazo | `.sm-contorno` |
| Variedades y citas | Gloock | `.sm-serif` |
| Texto, rótulos, barra superior | Space Mono 400 y 700 | por defecto en `body` y `.sm-etiqueta` |
| Notas a mano | Nothing You Could Do | `.sm-mano` |

## Componentes incluidos en el CSS

- `.sm-topbar`: la barra superior SANTO MONTE | sección | TOSTADO 02/10/2026. No lleva barra inferior.
- `.sm-bg-verde`, `.sm-bg-negro`, `.sm-bg-crema`, `.sm-bg-papel`: fondos de marca que ajustan solos el color del texto.
- `.sm-curvas` y `.sm-grilla`: textura de curvas de nivel y grilla de líneas de 1,5 px.
- `.sm-vidrio`: tarjeta de vidrio (liquid glass).
- `.sm-bolsa`: imagen de bolsa con sombra.
- `.sm-ficha`: tabla de productor, origen y altura.
- `.sm-precio`: banda de precio.
- `.sm-boton` y `.sm-boton--lleno`: botones.

---

## Reglas de marca

- **Logo:** usa siempre los archivos de `logo/`. Son el ojo original, sin redibujar. Para fondo claro usa la versión `-oscuro`: es el mismo cambio de color del sticker Café (trazos del ojo en negro tierra).
- **Versiones del ojo:**
  - `ojo` es la principal.
  - `ojo-sticker` tiene líneas más gruesas. Es mejor para tamaños pequeños.
  - `ojo-post` es la variante de las publicaciones.
- **Logo horizontal:** `santo-monte-logo-horizontal-*` es una composición nueva hecha con las piezas originales (ojo a la izquierda y SANTO MONTE a la derecha), pensada para el menú. Revísala antes de usarla.
- **Bolsas:** siempre la bolsa completa con recorte limpio y fondo transparente (`productos/`). Nunca recortes cuadrados ni bolsas cortadas por el borde.
- **Pedidos:** por DM a @santomontecoffee. No publiques cantidades disponibles.

## Lo que no se incluyó

- **Carrusel de precios v1/v2:** quedó reemplazado por Precios v3, y tenía cantidades de bolsas y WhatsApp.
- **Recortes de 3000 px de "Recortes sin fondo":** se usan los recortes limpios de 1800 px, que son los aprobados. Los originales siguen en `Post Lote 1/`.
- **PDF de imprenta, informes y propuestas comerciales:** no son material para la web.
- **Ombligón:** no se publica, así que no está en `productos.json`.

Nota: el flyer de CityU (`piezas/eventos/`) sí incluye el WhatsApp, porque así se imprimió.
