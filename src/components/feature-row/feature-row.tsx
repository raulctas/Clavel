import { ReactNode } from 'react';

import { Eyebrow } from 'components/eyebrow';

import styles from './feature-row.module.css';

interface Props {
  image: string;
  eyebrow?: string;
  title: string;
  /** Párrafos y, si hace falta, enlaces bajo el título. */
  children: ReactNode;
  /** Imagen a la derecha. Al apilarse en móvil, la imagen queda siempre arriba. */
  reverse?: boolean;
}

/** Fila de imagen 3:2 y texto (Inicio, Laboratorio, Producción y logística). */
export const FeatureRow = ({ image, eyebrow, title, children, reverse }: Props) => {
  const img = (
    <img src={image} alt="" className={styles.image} width={1200} height={800} loading="lazy" />
  );

  return (
    <div className={[styles.row, reverse && styles.reverse].filter(Boolean).join(' ')}>
      {!reverse && img}
      <div className={styles.text}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
      {reverse && img}
    </div>
  );
};
