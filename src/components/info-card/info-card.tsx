import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

import { IconCircle } from 'components/icon-circle';

import styles from './info-card.module.css';

interface Props {
  icon: LucideIcon;
  title: string;
  text: string;
  /** Contenido extra al pie de la tarjeta (etiquetas, botón…). */
  children?: ReactNode;
  /** Etiqueta del contenedor: `li` cuando la tarjeta va dentro de una lista. */
  as?: 'li' | 'div' | 'article';
}

/**
 * Tarjeta blanca de icono, título y texto, con el efecto de elevarse al pasar
 * el ratón (pilares de Inicio, Laboratorio, Producción, Productos y servicios).
 */
export const InfoCard = ({ icon, title, text, children, as: Tag = 'li' }: Props) => (
  <Tag className={`${styles.card} hover-lift`}>
    <IconCircle icon={icon} />
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.text}>{text}</p>
    {children && <div className={styles.footer}>{children}</div>}
  </Tag>
);
