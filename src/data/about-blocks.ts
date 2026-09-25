import { CircleCheck, Sprout, Target } from 'lucide-react';

import { Feature } from 'interfaces/feature';

/** Misión, objetivos y propósito de Quiénes somos. Textos en aboutUs.blocks.<key>. */
export const ABOUT_BLOCKS: Feature[] = [
  { key: 'mission', icon: Target },
  { key: 'goals', icon: CircleCheck },
  { key: 'purpose', icon: Sprout },
];
