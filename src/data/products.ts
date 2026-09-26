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
  Wheat,
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
  { key: 'cbdFertilisers', icon: Wheat },
  { key: 'agriculturalAdvice', icon: Handshake },
  { key: 'agriculturalTechnology', icon: Cpu },
  { key: 'gardening', icon: Flower2 },
];

/**
 * Clave de traducción del nombre de un producto que se puede pedir desde
 * Contactar, o `undefined` si la clave no existe (p. ej. una URL manipulada).
 */
export const productTitleKey = (key: string | null) => {
  if (MAIN_LINES.some((product) => product.key === key)) {
    return `productsServices.lines.${key}.title`;
  }
  if (OTHER_SOLUTIONS.some((product) => product.key === key)) {
    return `productsServices.other.${key}.title`;
  }
  return undefined;
};
