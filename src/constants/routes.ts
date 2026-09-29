/**
 * Mapa central de rutas de la aplicación. Cualquier navegación (Link, NavLink)
 * debe usar estas constantes en lugar de strings literales.
 */
export const routes = {
  home: '/',
  aboutUs: '/about-us',
  productsServices: '/products-services',
  laboratory: '/laboratory',
  production: '/production-logistics',
  news: '/news',
  newsDetail: '/news/:slug',
  team: '/team',
  contact: '/contact',
  privacy: '/privacy',
} as const;

/** Construye la ruta de una noticia a partir de su slug. */
export const newsDetailPath = (slug: string) => `${routes.news}/${slug}`;

/** Parámetro de la URL de Contactar que preselecciona el motivo de la consulta. */
export const CONTACT_REASON_PARAM = 'reason';

/** Parámetro de la URL de Contactar con el producto cuyo catálogo se pide. */
export const CONTACT_PRODUCT_PARAM = 'product';

/** Ruta de Contactar con el motivo «catálogo» ya elegido. */
export const catalogueRequestPath = `${routes.contact}?${CONTACT_REASON_PARAM}=catalogue`;

/** Ruta de Contactar para pedir el catálogo de un producto concreto. */
export const productCatalogueRequestPath = (productKey: string) =>
  `${catalogueRequestPath}&${CONTACT_PRODUCT_PARAM}=${productKey}`;
