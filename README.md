# Santo Monte · Café de altura y especialidad

Sitio web de **Santo Monte**: vitrina de marca estática y bilingüe (español/inglés). Los pedidos se hacen por WhatsApp.

- Producción: <https://santomontecoffee.online>
- Hecho con Astro 7, TypeScript, Tailwind CSS v4 y Motion.
- Las decisiones de diseño y arquitectura están en [`CLAUDE.md`](./CLAUDE.md).

---

## 1. Correr el proyecto

Requisitos: **Node.js 22.23.4 o superior** (la versión exacta está en `.node-version`).

```bash
npm install
```

```bash
npm run dev
```

Abre <http://localhost:4321>. Los cambios se ven al guardar.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Revisa los tipos (`astro check`) y genera el sitio en `dist/` |
| `npm run preview` | Sirve `dist/` para probar la versión final |
| `npm run optimize:svg` | Vuelve a copiar y optimizar logos y texturas de `assets/` a `public/brand/` |

La primera compilación tarda 1 o 2 minutos porque optimiza todas las imágenes. Las siguientes son mucho más rápidas.

---

## 2. Editar contenido

Todo el contenido editable está en archivos de datos. Si falta un campo o está mal escrito, `npm run build` muestra un error que dice cuál es.

### Cafés · `src/content/cafes/*.json`

Cada café es un archivo, y el nombre del archivo es su URL (`caturra-lavado.json` → `/cafes/caturra-lavado/`).

```jsonc
{
  "orden": 1,                       // posición en la guía y en la grilla
  "publicado": true,                // false = se oculta del sitio
  "variedad": { "es": "Caturra", "en": "Caturra" },
  "proceso": "lavado",              // "lavado" o "natural"
  "perfil":   { "es": "Lo dulce y clásico", "en": "Sweet and classic" },
  "paraTiSi": { "es": "Estás empezando…", "en": "You're just getting…" },
  "titular":  { "es": "…", "en": "…" },
  "historia": { "es": ["párrafo 1", "párrafo 2"], "en": ["…", "…"] },
  "notas":    { "es": ["Caramelo", "Melcocha"], "en": ["Caramel", "Taffy"] },
  "presentaciones": [250],          // gramos; aparecen en el selector de pedido
  "limitado": false,                // true = etiqueta "Edición limitada"
  "bolsa": "../../../assets/productos/bolsa-caturra-lavado-250g.png",
  "foto":  "../../../assets/fotos/producto/caturra-250g-01-2400.jpg",
  "fotoAlt": { "es": "Descripción de la foto", "en": "Photo description" }
}
```

- **Agregar un café:** copia un archivo, cámbiale el nombre y los datos, y pon las imágenes en `assets/`. La página, la tarjeta, la guía, el sitemap y los datos estructurados se generan solos.
- **Quitar un café:** pon `"publicado": false`.
- **Otra presentación** (p. ej. 340 g): agrégala a `"presentaciones": [250, 340]`.
- **Imágenes:** la bolsa debe ser un PNG recortado con fondo transparente, completa y sin cortes. Las rutas se escriben relativas al archivo JSON.

### Kits · `src/content/kits/*.json`

Hoy los dos kits (V60 y prensa francesa) se muestran como **Próximamente**. Cuando estén a la venta, pon `"disponible": true` y el botón pasa a «Pedir por WhatsApp». Para agregar foto, usa `"foto"` y `"fotoAlt"` (como en los cafés).

### Lecciones · `src/content/lecciones/*.json`

Las 6 lecciones de «La montaña no miente»: título, bajada, párrafos y portada en cada idioma.

### Datos generales

| Archivo | Qué contiene |
|---|---|
| `src/data/site.json` | Número de WhatsApp, Instagram, dominio y color del tema |
| `src/data/lote.json` | Número de lote, productor, finca, municipio y altura |
| `src/data/recetas.ts` | Recetas de las bitácoras V60 y blend |
| `src/i18n/ui.ts` | Textos de botones, menús y del mensaje de WhatsApp en los dos idiomas |

**Mensaje de WhatsApp:** se arma en `src/lib/whatsapp.ts` con los textos `wa.*` de `src/i18n/ui.ts`. Por ejemplo:

```
Hola, Santo Monte. Quiero pedir:
• Café: Borbón Rosado lavado
• Presentación: 250 g
• Cantidad: 2

¿Me cuentan el precio y cómo es la entrega?
```

---

## 3. Desplegar en Cloudflare Pages

El sitio es 100 % estático: Cloudflare solo publica la carpeta `dist/`.

### Opción A · Conectar el repositorio de GitHub (recomendada)

Con esta opción, cada `git push` a `main` publica el sitio solo.

1. Entra a <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → pestaña **Pages** → **Import an existing Git repository**.
2. Autoriza GitHub y elige `Santigomo/Santo-Monte-Coffee`.
3. Configura el build:

   | Campo | Valor |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Variable de entorno | `NODE_VERSION` = `22.23.4` (opcional: Cloudflare ya lee `.node-version`) |

4. **Save and Deploy**. En unos minutos queda en `https://<proyecto>.pages.dev`.

### Conectar el dominio `santomontecoffee.online`

1. En el proyecto de Pages: **Custom domains** → **Set up a custom domain** → `santomontecoffee.online`.
2. Si el dominio ya usa los DNS de Cloudflare, el registro se crea solo. Si no, Cloudflare te muestra el registro `CNAME` que tienes que crear donde compraste el dominio.
3. Agrega también `www.santomontecoffee.online`. Después, en **Rules → Redirect Rules**, redirige `www` al dominio principal con un 301.
4. El certificado HTTPS se emite automáticamente.

### Opción B · Subir desde la terminal (sin GitHub)

```bash
npm run build
```

```bash
npx wrangler pages deploy dist --project-name santo-monte
```

La primera vez, Wrangler abre el navegador para iniciar sesión en Cloudflare.

### Qué ya viene configurado

- `public/_headers`: caché permanente para `/_astro/*` y `/fonts/*`, más cabeceras de seguridad.
- `public/_redirects`: redirecciones.
- `public/robots.txt` y `sitemap-index.xml` (se genera al compilar).
- Página `404` con la marca.

### Después de publicar

- Registra el sitio en [Google Search Console](https://search.google.com/search-console) y envía `https://santomontecoffee.online/sitemap-index.xml`.
- Prueba cómo se ve al compartir en WhatsApp: pega el enlace en un chat.

---

## Estructura

```
assets/        Material original de la marca (fuente; no se publica directamente)
public/        Archivos servidos tal cual (fuentes, favicon, OG, SVG, _headers)
src/content/   Cafés, kits y lecciones (JSON editables)
src/data/      Datos de la marca, del lote y recetas
src/i18n/      Textos y rutas en español e inglés
src/components/ Componentes de marca, producto, secciones y páginas
src/pages/     Rutas del sitio (ES y /en/)
src/styles/    Estilos globales y tokens de marca
```

Licencias: las fuentes (Archivo, Space Mono, Gloock, Nothing You Could Do) usan la SIL Open Font License 1.1.
