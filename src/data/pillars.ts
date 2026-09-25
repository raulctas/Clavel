import { FlaskConical, Leaf, MapPin, Sprout } from 'lucide-react';

import { Feature } from 'interfaces/feature';

/** Pilares de Clavel (Inicio y «¿Por qué elegirnos?»). Textos en pillars.<key>. */
export const PILLARS: Feature[] = [
  { key: 'sustainableFarming', icon: Leaf },
  { key: 'innovation', icon: FlaskConical },
  { key: 'presence', icon: MapPin },
  { key: 'research', icon: Sprout },
];
