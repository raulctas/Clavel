import { Container } from 'components/container';

import styles from './photo-gallery.module.css';

interface Props {
  title: string;
  /** Fotos verticales 4:5 (800×1000). Son decorativas: sin texto alternativo. */
  images: string[];
}

/** Sección con título y una rejilla de fotos (Laboratorio y Producción y logística). */
export const PhotoGallery = ({ title, images }: Props) => (
  <Container as="section" className={styles.gallery}>
    <h2 className={styles.title}>{title}</h2>
    <ul className={styles.grid}>
      {images.map((src) => (
        <li key={src}>
          <img src={src} alt="" className={styles.image} width={800} height={1000} loading="lazy" />
        </li>
      ))}
    </ul>
  </Container>
);
