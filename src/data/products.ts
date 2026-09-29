import {
  Cpu,
  Flower2,
  FlaskConical,
  Handshake,
  Layers,
  Leaf,
  LucideIcon,
  Mountain,
  Package,
  ShieldCheck,
  Sprout,
  TrendingUp,
} from 'lucide-react';

export type ProductTag = 'certified' | 'drone';

export interface Product {
  key: string;
  icon: LucideIcon;
  tags?: ProductTag[];
}

/**
 * Productos y servicios de Clavel. Los textos están en `translation.json`:
 * productsServices.lines.<key>, productsServices.ranges.<key> y
 * productsServices.other.<key>. Las líneas principales y las otras soluciones
 * se pueden pedir desde Contactar (su `key` viaja en la URL).
 */
export const MAIN_LINES: Product[] = [
  { key: 'organicFertilisers', icon: Leaf, tags: ['certified', 'drone'] },
  { key: 'sustainableFertilisers', icon: Sprout, tags: ['drone'] },
];

/** Gamas en las que se organizan las dos líneas principales. */
export const PRODUCT_RANGES: Product[] = [
  { key: 'terra', icon: Mountain },
  { key: 'protection', icon: ShieldCheck },
  { key: 'booster', icon: TrendingUp },
  { key: 'nutrition', icon: FlaskConical },
  { key: 'correctors', icon: Layers },
];

export const OTHER_SOLUTIONS: Product[] = [
  { key: 'agriculturalInputs', icon: Package },
  { key: 'agriculturalAdvice', icon: Handshake },
  { key: 'agriculturalTechnology', icon: Cpu },
  { key: 'gardening', icon: Flower2 },
];

/**
 * Catálogos que se pueden pedir desde Contactar: uno por cada línea principal y
 * por cada una de las otras soluciones, en el orden de Productos y servicios.
 */
export const CATALOGUES = [...MAIN_LINES, ...OTHER_SOLUTIONS].map((product) => product.key);

export const isCatalogue = (key: string | null): key is string =>
  key !== null && CATALOGUES.includes(key);

/** Clave de traducción del nombre de un catálogo (el de su línea o solución). */
export const catalogueTitleKey = (key: string) =>
  MAIN_LINES.some((product) => product.key === key)
    ? `productsServices.lines.${key}.title`
    : `productsServices.other.${key}.title`;
