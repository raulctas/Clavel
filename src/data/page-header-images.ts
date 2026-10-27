/**
 * Imágenes de fondo de las bandas de título de las páginas interiores. Para
 * cambiarlas basta con dejar la nueva en `public/images/` y actualizar aquí la
 * ruta. Son decorativas (sin texto alternativo) y se muestran atenuadas para
 * que el texto se lea bien.
 */
export const PAGE_HEADER_IMAGES = {
  aboutUs: '/images/about-us/header.jpg',
  // La misma que Contactar.
  products: '/images/contact/header.jpg',
  laboratory: '/images/laboratory/header.jpg',
  production: '/images/production/header.jpg',
  // La misma que la portada de Inicio.
  news: '/images/home/hero.jpg',
  contact: '/images/contact/header.jpg',
  // La misma que Quiénes somos.
  privacy: '/images/about-us/header.jpg',
} as const;

/**
 * Encuadre vertical de las fotos que no deben recortarse por el centro: la
 * banda es muy apaisada y, centrada, a la del campo se le cortan las cabezas.
 * Valor de `object-position`; las que no aparecen aquí van centradas.
 */
export const PAGE_HEADER_FOCUS: Record<string, string> = {
  '/images/contact/header.jpg': 'center 15%',
};
