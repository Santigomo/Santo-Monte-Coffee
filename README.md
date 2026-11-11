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

## 3. Desplegar en Cloudflare

El sitio es 100 % estático. Cloudflare lo compila y publica la carpeta `dist/` como **Worker con Static Assets**, que es lo que el panel crea hoy por defecto. La configuración está en `wrangler.jsonc`.

### Conectar el repositorio (ya hecho)

En **Workers & Pages** → proyecto `santo-monte-coffee` → **Settings → Build**:

| Campo | Valor |
|---|---|
| Git repository | `Santigomo/Santo-Monte-Coffee`, rama `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Variable de entorno | `NODE_VERSION` = `22.23.4` (opcional: ya se lee de `.node-version`) |

Cada `git push` a `main` publica el sitio automáticamente.

### URL de prueba (workers.dev)

`wrangler.jsonc` trae `"workers_dev": true`, así que después del primer deploy el sitio queda en `https://santo-monte-coffee.<tu-subdominio>.workers.dev`. Si no aparece, actívala en **Settings → Domains & Routes → workers.dev → Enable**.

### Conectar el dominio `santomontecoffee.online` (comprado en Hostinger)

El dominio tiene que estar administrado por Cloudflare:

1. En Cloudflare: **Add a domain** → `santomontecoffee.online` → plan Free. Cloudflare te da **dos nameservers**.
2. En Hostinger: **Dominios → santomontecoffee.online → DNS / Nameservers → Cambiar nameservers** y pega los dos de Cloudflare.
3. Cuando el dominio aparezca como **Active** en Cloudflare (de minutos a unas horas), entra al Worker → **Settings → Domains & Routes → Add → Custom domain** y agrega `santomontecoffee.online` y `www.santomontecoffee.online`. Los registros DNS y el certificado HTTPS se crean solos.

### Opción manual (desde la terminal)

```bash
npm run build
```

```bash
npx wrangler deploy
```

La primera vez, Wrangler abre el navegador para iniciar sesión en Cloudflare.

### Qué ya viene configurado

- `wrangler.jsonc`: sirve `dist/`, usa `404.html` para rutas inexistentes y agrega la barra final a las URL.
- `public/_headers`: caché permanente para `/_astro/*` y `/fonts/*`, más cabeceras de seguridad.
- `public/_redirects`: redirecciones.
- `public/robots.txt` y `sitemap-index.xml` (se genera al compilar).

### Después de publicar

- Registra el sitio en [Google Search Console](https://search.google.com/search-console) y envía `https://santomontecoffee.online/sitemap-index.xml`.
- Prueba cómo se ve al compartir en WhatsApp: pega el enlace en un chat.

---

## Estructura

```
assets/        Material original de la marca (fuente; no se publica directamente)
public/        Archivos servidos tal cual (fuentes, favicon, OG, SVG, _headers)
wrangler.jsonc Configuración de Cloudflare (Worker con Static Assets)
src/content/   Cafés, kits y lecciones (JSON editables)
src/data/      Datos de la marca, del lote y recetas
src/i18n/      Textos y rutas en español e inglés
src/components/ Componentes de marca, producto, secciones y páginas
src/pages/     Rutas del sitio (ES y /en/)
src/styles/    Estilos globales y tokens de marca
```

Licencias: las fuentes (Archivo, Space Mono, Gloock, Nothing You Could Do) usan la SIL Open Font License 1.1.
