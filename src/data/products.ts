export type ProductTag = 'certified' | 'drone';

export type BrandKey = 'clavel' | 'agrentis';

export interface Brand {
  key: BrandKey;
  tags: ProductTag[];
}

export interface ProductRange {
  key: string;
  /** Ilustración en círculo blanco, con fondo transparente. */
  image: string;
}

/**
 * Marcas de Clavel (página Productos). Los textos están en `translation.json`:
 * products.brands.<key> (nombre, línea y descripción) y products.tags.<tag>.
 */
export const BRANDS: Brand[] = [
  { key: 'clavel', tags: ['certified', 'drone'] },
  { key: 'agrentis', tags: ['drone'] },
];

/**
 * Las cinco gamas en las que se divide cada marca; son las mismas en las dos.
 * Textos en products.ranges.<key>.
 */
export const PRODUCT_RANGES: ProductRange[] = [
  { key: 'terra', image: '/images/products/range-terra.webp' },
  { key: 'protection', image: '/images/products/range-protection.webp' },
  { key: 'booster', image: '/images/products/range-booster.webp' },
  { key: 'nutrition', image: '/images/products/range-nutrition.webp' },
  { key: 'correctors', image: '/images/products/range-correctors.webp' },
];

/**
 * Catálogos que se pueden pedir desde Contactar: uno por marca. Contactar acepta
 * `?product=<marca>` para dejar su catálogo ya marcado.
 */
export const CATALOGUES: string[] = BRANDS.map((brand) => brand.key);

/** Marca a partir del segmento de la URL (/products/<marca>); `undefined` si no existe. */
export const findBrand = (key: string | undefined) => BRANDS.find((brand) => brand.key === key);

export const isCatalogue = (key: string | null): key is string =>
  key !== null && CATALOGUES.includes(key);

/** Clave de traducción del nombre de un catálogo (el de su marca). */
export const catalogueTitleKey = (key: string) => `products.brands.${key}.name`;
