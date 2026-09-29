import { FlaskConical, Leaf, MapPin, Sprout } from 'lucide-react';

import { Feature } from 'interfaces/feature';

/**
 * Pilares de Clavel (Inicio y «¿Por qué elegirnos?»). Textos en pillars.<key>.
 * Las tarjetas de Inicio muestran la ilustración (sin icono); «¿Por qué
 * elegirnos?», el icono.
 */
export const PILLARS: Feature[] = [
  {
    key: 'sustainableFarming',
    icon: Leaf,
    image: '/images/home/pillar-sustainable-farming.webp',
  },
  { key: 'innovation', icon: FlaskConical, image: '/images/home/pillar-innovation.webp' },
  { key: 'presence', icon: MapPin, image: '/images/home/pillar-presence.webp' },
  { key: 'research', icon: Sprout, image: '/images/home/pillar-research.webp' },
];
