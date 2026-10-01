/**
 * Mapa central de rutas de la aplicación. Cualquier navegación (Link, NavLink)
 * debe usar estas constantes en lugar de strings literales.
 */
export const routes = {
  home: '/',
  aboutUs: '/about-us',
  products: '/products',
  productRange: '/products/:range',
  productDetail: '/products/:range/:product',
  laboratory: '/laboratory',
  production: '/production-logistics',
  news: '/news',
  newsDetail: '/news/:slug',
  team: '/team',
  contact: '/contact',
  privacy: '/privacy',
} as const;

/**
 * Direcciones antiguas que redirigen a la actual (para no romper enlaces
 * guardados): la página «Productos y servicios» y las de las antiguas marcas.
 */
export const legacyRedirects = [
  { from: '/products-services', to: routes.products },
  { from: '/products/clavel', to: routes.products },
  { from: '/products/agrentis', to: routes.products },
] as const;

/** Construye la ruta de una gama de producto. */
export const productRangePath = (range: string) => `${routes.products}/${range}`;

/** Construye la ruta de la ficha de un producto. */
export const productPath = (range: string, slug: string) => `${productRangePath(range)}/${slug}`;

/** Construye la ruta de una noticia a partir de su slug. */
export const newsDetailPath = (slug: string) => `${routes.news}/${slug}`;

/** Parámetro de la URL de Contactar que preselecciona el motivo de la consulta. */
export const CONTACT_REASON_PARAM = 'reason';

/** Parámetro de la URL de Contactar con el producto sobre el que se pide información. */
export const CONTACT_PRODUCT_PARAM = 'product';

/** Contactar con el motivo «Información sobre productos» y el producto ya elegido. */
export const productInfoRequestPath = (slug: string) =>
  `${routes.contact}?${CONTACT_REASON_PARAM}=productInfo&${CONTACT_PRODUCT_PARAM}=${slug}`;
