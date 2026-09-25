import { LucideIcon } from 'lucide-react';

import styles from './icon-circle.module.css';

interface Props {
  icon: LucideIcon;
  /** `lg` es el de la confirmación del formulario (56px). */
  size?: 'md' | 'lg';
}

/** Icono verde dentro de un círculo brote. Decorativo. */
export const IconCircle = ({ icon: Icon, size = 'md' }: Props) => (
  <span className={[styles.circle, styles[size]].join(' ')} aria-hidden>
    <Icon size={size === 'lg' ? 28 : 26} strokeWidth={2} />
  </span>
);
