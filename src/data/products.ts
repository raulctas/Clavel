export type ProductTag = 'certified' | 'drone';

export type RangeKey = 'terra' | 'protection' | 'booster' | 'nutrition' | 'correctors';

export interface ProductRange {
  key: RangeKey;
  /** Número de la gama (1-5), como en el catálogo. */
  number: number;
  /** Ilustración en círculo blanco, con fondo transparente. */
  image: string;
}

export type ProductState = 'liquid' | 'solid';

export interface Product {
  /** Dirección de la ficha: /products/<gama>/<slug>. */
  slug: string;
  /** Nombre comercial; no se traduce. */
  name: string;
  range: RangeKey;
  state: ProductState;
  /** Envases disponibles, en el orden en que se muestran. */
  formats: string[];
  /**
   * Fotos del producto (WebP transparentes): la principal y, si las hay, las de
   * los demás envases, con el formato al que corresponde cada una.
   */
  images: { src: string; format: string }[];
}

/** Etiquetas comunes a todos los productos de Clavel (página Productos). */
export const PRODUCT_TAGS: ProductTag[] = ['certified', 'drone'];

/**
 * Las cinco gamas de producto, en orden. Textos en products.ranges.<key>
 * (title, text e intro). La gama es también el segmento de la URL.
 */
export const PRODUCT_RANGES: ProductRange[] = [
  { key: 'terra', number: 1, image: '/images/products/range-terra.webp' },
  { key: 'protection', number: 2, image: '/images/products/range-protection.webp' },
  { key: 'booster', number: 3, image: '/images/products/range-booster.webp' },
  { key: 'nutrition', number: 4, image: '/images/products/range-nutrition.webp' },
  { key: 'correctors', number: 5, image: '/images/products/range-correctors.webp' },
];

const images = (slug: string, formats: string[]) =>
  formats.map((format, index) => ({
    src: `/images/products/${slug}/${index === 0 ? 'main' : format.replace(/\s/g, '').toLowerCase()}.webp`,
    format,
  }));

const LITRES = ['1 L', '5 L', '20 L'];

/**
 * Productos de Clavel, con la nomenclatura de 2026 (Excel «CLAVEL PRODUCTOS»).
 * Función, descripción y composición están en products.items.<slug>. Las fotos
 * son provisionales: las etiquetas aún muestran la marca y el nombre anteriores.
 */
export const PRODUCTS: Product[] = [
  {
    slug: 'clavel-green',
    name: 'Clavel Green',
    range: 'terra',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-green', LITRES),
  },
  {
    slug: 'clavel-soil',
    name: 'Clavel Soil',
    range: 'terra',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-soil', LITRES),
  },
  {
    slug: 'clavel-libero',
    name: 'Clavel Libero',
    range: 'terra',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-libero', ['1 L', '5 L']),
  },
  {
    slug: 'clavel-shield',
    name: 'Clavel Shield',
    range: 'protection',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-shield', LITRES),
  },
  {
    slug: 'clavel-protect',
    name: 'Clavel Protect',
    range: 'protection',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-protect', LITRES),
  },
  {
    slug: 'clavel-curar',
    name: 'Clavel Curar',
    range: 'protection',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-curar', LITRES),
  },
  {
    slug: 'clavel-defender',
    name: 'Clavel Defender',
    range: 'booster',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-defender', LITRES),
  },
  {
    slug: 'clavel-save',
    name: 'Clavel Save',
    range: 'booster',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-save', LITRES),
  },
  {
    slug: 'clavel-flor',
    name: 'Clavel Flor',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-flor', LITRES),
  },
  {
    slug: 'clavel-amarre',
    name: 'Clavel Amarre',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-amarre', LITRES),
  },
  {
    slug: 'clavel-engord',
    name: 'Clavel Engord',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-engord', LITRES),
  },
  {
    slug: 'clavel-ultimate',
    name: 'Clavel Ultimate',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-ultimate', LITRES),
  },
  {
    slug: 'clavel-forte',
    name: 'Clavel Forte',
    range: 'correctors',
    state: 'liquid',
    formats: LITRES,
    images: images('clavel-forte', LITRES),
  },
  {
    slug: 'clavel-iron',
    name: 'Clavel Iron',
    range: 'correctors',
    state: 'solid',
    formats: ['1 kg', '5 kg'],
    images: images('clavel-iron', ['1 kg']),
  },
];

export const findRange = (key: string | undefined) =>
  PRODUCT_RANGES.find((range) => range.key === key);

export const productsOfRange = (key: RangeKey) =>
  PRODUCTS.filter((product) => product.range === key);

/** Producto de una gama a partir de la URL; `undefined` si no existe o no es de esa gama. */
export const findProduct = (range: string | undefined, slug: string | undefined) =>
  PRODUCTS.find((product) => product.slug === slug && product.range === range);

export const isProduct = (slug: string | null): slug is string =>
  slug !== null && PRODUCTS.some((product) => product.slug === slug);

/** Catálogos que se pueden pedir desde Contactar: uno por gama. */
export const CATALOGUES: string[] = PRODUCT_RANGES.map((range) => range.key);

/** Clave de traducción del nombre de un catálogo (el de su gama). */
export const catalogueTitleKey = (key: string) => `products.ranges.${key}.title`;
