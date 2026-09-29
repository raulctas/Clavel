/**
 * Mapa central de rutas de la aplicación. Cualquier navegación (Link, NavLink)
 * debe usar estas constantes en lugar de strings literales.
 */
export const routes = {
  home: '/',
  aboutUs: '/about-us',
  products: '/products',
  laboratory: '/laboratory',
  production: '/production-logistics',
  news: '/news',
  newsDetail: '/news/:slug',
  team: '/team',
  contact: '/contact',
  privacy: '/privacy',
} as const;

/** Direcciones antiguas que redirigen a la actual (para no romper enlaces guardados). */
export const legacyRedirects = [{ from: '/products-services', to: routes.products }] as const;

/** Construye la ruta de una noticia a partir de su slug. */
export const newsDetailPath = (slug: string) => `${routes.news}/${slug}`;

/** Parámetro de la URL de Contactar que preselecciona el motivo de la consulta. */
export const CONTACT_REASON_PARAM = 'reason';

/** Parámetro de la URL de Contactar con la marca cuyo catálogo se pide. */
export const CONTACT_PRODUCT_PARAM = 'product';
