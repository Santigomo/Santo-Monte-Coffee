/**
 * Colecciones de contenido de Santo Monte.
 * Los productos viven en archivos JSON dentro de src/content/: se editan sin tocar componentes.
 * Zod valida cada archivo al compilar: si falta un campo, el build falla con un mensaje claro.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Texto en los dos idiomas del sitio. */
const t = z.object({ es: z.string().min(1), en: z.string().min(1) });
/** Lista de textos (párrafos o notas) en los dos idiomas. */
const tList = z.object({ es: z.array(z.string()).min(1), en: z.array(z.string()).min(1) });

const cafes = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/cafes' }),
  schema: ({ image }) =>
    z.object({
      /** Orden de aparición (guía "¿Cuál es tu café?"). */
      orden: z.number().int(),
      /** Si es false, el café no se muestra en el sitio. */
      publicado: z.boolean().default(true),
      variedad: t,
      proceso: z.enum(['lavado', 'natural']),
      /** Frase corta del perfil: "Lo dulce y clásico". */
      perfil: t,
      /** "Para ti si…" */
      paraTiSi: t,
      /** Titular editorial de la ficha. */
      titular: t,
      historia: tList,
      notas: tList,
      /** Presentaciones en gramos. Hoy solo 250 g. */
      presentaciones: z.array(z.number().int().positive()).min(1),
      /** Muestra la etiqueta "Edición limitada". */
      limitado: z.boolean().default(false),
      /** Bolsa completa recortada con fondo transparente (assets/productos). */
      bolsa: image(),
      /** Foto de la bolsa en contexto (assets/fotos/producto). */
      foto: image(),
      fotoAlt: t,
    }),
});

const kits = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/kits' }),
  schema: ({ image }) =>
    z.object({
      orden: z.number().int(),
      /** false = se muestra como "Próximamente" con botón de aviso. */
      disponible: z.boolean().default(false),
      nombre: t,
      metodo: t,
      descripcion: t,
      foto: image().optional(),
      fotoAlt: t.optional(),
    }),
});

const lecciones = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/lecciones' }),
  schema: ({ image }) =>
    z.object({
      numero: z.number().int(),
      titulo: t,
      bajada: t,
      cuerpo: tList,
      portadaEs: image(),
      portadaEn: image(),
      portadaAlt: t,
    }),
});

export const collections = { cafes, kits, lecciones };
