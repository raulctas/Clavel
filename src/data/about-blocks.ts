import { Sprout, Star, Trophy } from 'lucide-react';

import { Feature } from 'interfaces/feature';

/**
 * Misión, objetivos y propósito de Quiénes somos. Textos en aboutUs.blocks.<key>.
 * Los iconos son los mismos que en la web de Grupo Alfa (brote, estrella y trofeo).
 */
export const ABOUT_BLOCKS: Feature[] = [
  { key: 'mission', icon: Sprout },
  { key: 'goals', icon: Star },
  { key: 'purpose', icon: Trophy },
];
