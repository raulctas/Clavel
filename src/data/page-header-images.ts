/**
 * Imágenes de fondo de las bandas de título de las páginas interiores. Las de
 * `provisional/` están pendientes: para cambiarlas basta con dejar la definitiva
 * en `public/images/` y actualizar aquí la ruta. Son decorativas (sin texto
 * alternativo) y se muestran atenuadas para que el texto se lea bien.
 */
export const PAGE_HEADER_IMAGES = {
  aboutUs: '/images/about-us/header.jpg',
  // La misma que Contactar.
  productsServices: '/images/contact/header.jpg',
  laboratory: '/images/laboratory/header.jpg',
  production: '/images/production/header.jpg',
  // La misma que la portada de Inicio.
  news: '/images/home/hero.jpg',
  // La misma que Quiénes somos.
  team: '/images/about-us/header.jpg',
  contact: '/images/contact/header.jpg',
  privacy: '/images/provisional/hero-3.png',
} as const;
