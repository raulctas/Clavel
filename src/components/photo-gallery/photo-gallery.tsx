import { Container } from 'components/container';

import styles from './photo-gallery.module.css';

interface Props {
  title: string;
  /** Fotos verticales 4:5 (800×1000). Son decorativas: sin texto alternativo. */
  images: string[];
}

/**
 * Sección con título y una tira de fotos que se desplaza sola de derecha a
 * izquierda, en bucle (Laboratorio). La tira lleva las fotos dos veces para
 * que el bucle no dé saltos; la copia se oculta a los lectores de pantalla.
 * Se para al pasar el ratón y, si el usuario ha pedido reducir el movimiento,
 * queda quieta y se desplaza a mano.
 */
export const PhotoGallery = ({ title, images }: Props) => (
  <section className={styles.gallery}>
    <Container>
      <h2 className={styles.title}>{title}</h2>
    </Container>
    <Container className={styles.viewport}>
      <ul className={styles.track}>
        {[...images, ...images].map((src, index) => {
          const isCopy = index >= images.length;
          return (
            <li
              key={`${src}-${index}`}
              className={[styles.item, isCopy && styles.copy].filter(Boolean).join(' ')}
              aria-hidden={isCopy || undefined}
            >
              <img src={src} alt="" className={styles.image} width={800} height={1000} />
            </li>
          );
        })}
      </ul>
    </Container>
  </section>
);
