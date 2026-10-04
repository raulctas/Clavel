/**
 * Mapa central de rutas de la aplicación. Cualquier navegación (Link, NavLink)
 * debe usar estas constantes en lugar de strings literales.
 */
export const routes = {
  home: '/',
  aboutUs: '/about-us',
  products: '/products',
  // Ruta fija: React Router la elige antes que /products/:range.
  allProducts: '/products/all',
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
 * guardados): la página «Productos y servicios», las de las antiguas marcas y
 * las noticias retiradas.
 */
export const legacyRedirects = [
  { from: '/products-services', to: routes.products },
  { from: '/products/clavel', to: routes.products },
  { from: '/products/agrentis', to: routes.products },
  // Noticias retiradas.
  { from: '/news/fruit-vegetables', to: routes.news },
  { from: '/news/citrus-fertilisation', to: routes.news },
] as const;

/** Construye la ruta de una gama de producto. */
export const productRangePath = (range: string) => `${routes.products}/${range}`;

/** Construye la ruta de la ficha de un producto. */
export const productPath = (range: string, slug: string) => `${productRangePath(range)}/${slug}`;

/** Parámetro de la URL de Noticias con la categoría por la que filtrar. */
export const NEWS_CATEGORY_PARAM = 'category';

/** Noticias filtradas por una categoría. */
export const newsCategoryPath = (category: string) =>
  `${routes.news}?${NEWS_CATEGORY_PARAM}=${category}`;

/** Construye la ruta de una noticia a partir de su slug. */
export const newsDetailPath = (slug: string) => `${routes.news}/${slug}`;

/** Parámetro de la URL de Contactar que preselecciona el motivo de la consulta. */
export const CONTACT_REASON_PARAM = 'reason';

/** Parámetro de la URL de Contactar con el producto sobre el que se pide información. */
export const CONTACT_PRODUCT_PARAM = 'product';

/** Parámetro de la URL de Contactar con el catálogo (gama) que se quiere recibir. */
export const CONTACT_CATALOGUE_PARAM = 'catalogue';

/** Contactar con el motivo «Solicitar catálogo» y el catálogo de esa gama ya marcado. */
export const catalogueRequestPath = (range: string) =>
  `${routes.contact}?${CONTACT_REASON_PARAM}=catalogue&${CONTACT_CATALOGUE_PARAM}=${range}`;

/** Contactar con el motivo «Información sobre productos» y el producto ya elegido. */
export const productInfoRequestPath = (slug: string) =>
  `${routes.contact}?${CONTACT_REASON_PARAM}=productInfo&${CONTACT_PRODUCT_PARAM}=${slug}`;
