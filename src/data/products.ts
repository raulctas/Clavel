export type RangeKey = 'terra' | 'protection' | 'booster' | 'nutrition' | 'correctors';

export interface ProductRange {
  key: RangeKey;
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

/**
 * Las cinco gamas de producto, en orden. Textos en products.ranges.<key>
 * (title, text e intro). La gama es también el segmento de la URL.
 */
export const PRODUCT_RANGES: ProductRange[] = [
  { key: 'terra', image: '/images/products/range-terra.webp' },
  { key: 'protection', image: '/images/products/range-protection.webp' },
  { key: 'booster', image: '/images/products/range-booster.webp' },
  { key: 'nutrition', image: '/images/products/range-nutrition.webp' },
  { key: 'correctors', image: '/images/products/range-correctors.webp' },
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
    slug: 'green',
    name: 'Green',
    range: 'terra',
    state: 'liquid',
    formats: LITRES,
    images: images('green', LITRES),
  },
  {
    slug: 'soil',
    name: 'Soil',
    range: 'terra',
    state: 'liquid',
    formats: LITRES,
    images: images('soil', LITRES),
  },
  {
    slug: 'libero',
    name: 'Libero',
    range: 'terra',
    state: 'liquid',
    formats: LITRES,
    images: images('libero', ['1 L', '5 L']),
  },
  {
    slug: 'shield',
    name: 'Shield',
    range: 'protection',
    state: 'liquid',
    formats: LITRES,
    images: images('shield', LITRES),
  },
  {
    slug: 'protect',
    name: 'Protect',
    range: 'protection',
    state: 'liquid',
    formats: LITRES,
    images: images('protect', LITRES),
  },
  {
    slug: 'curar',
    name: 'Curar',
    range: 'protection',
    state: 'liquid',
    formats: LITRES,
    images: images('curar', LITRES),
  },
  {
    slug: 'defender',
    name: 'Defender',
    range: 'booster',
    state: 'liquid',
    formats: LITRES,
    images: images('defender', LITRES),
  },
  {
    slug: 'save',
    name: 'Save',
    range: 'booster',
    state: 'liquid',
    formats: LITRES,
    images: images('save', LITRES),
  },
  {
    slug: 'flor',
    name: 'Flor',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('flor', LITRES),
  },
  {
    slug: 'amarre',
    name: 'Amarre',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('amarre', LITRES),
  },
  {
    slug: 'engord',
    name: 'Engord',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('engord', LITRES),
  },
  {
    slug: 'ultimate',
    name: 'Ultimate',
    range: 'nutrition',
    state: 'liquid',
    formats: LITRES,
    images: images('ultimate', LITRES),
  },
  {
    slug: 'forte',
    name: 'Forte',
    range: 'correctors',
    state: 'liquid',
    formats: LITRES,
    images: images('forte', LITRES),
  },
  {
    slug: 'iron',
    name: 'Iron',
    range: 'correctors',
    state: 'solid',
    formats: ['1 kg', '5 kg'],
    images: images('iron', ['1 kg']),
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
