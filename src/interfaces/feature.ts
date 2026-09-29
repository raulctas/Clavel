import { LucideIcon } from 'lucide-react';

/**
 * Elemento con icono, título y texto (pilares, bloques de Quiénes somos). Los
 * textos se leen de `translation.json` a partir de `key`.
 */
export interface Feature {
  key: string;
  icon: LucideIcon;
  /** Ilustración opcional (PNG/WebP con fondo transparente) para la tarjeta. */
  image?: string;
}
