import { Breadcrumb } from 'components/breadcrumb';
import { Container } from 'components/container';

import styles from './page-header.module.css';

interface Props {
  /** Nombre de la página, para la ruta de navegación. */
  page: string;
  title: string;
  intro: string;
  /** Más aire (Quiénes somos): 72px abajo en lugar de 56px. */
  spacious?: boolean;
  /** Limita el bloque de texto a 680px (Equipo). */
  narrow?: boolean;
}

/**
 * Banda crema de título de las páginas interiores: ruta, H1 y entrada. Es el
 * primer bloque de la página, así que lleva el hueco de la cabecera flotante.
 */
export const PageHeader = ({ page, title, intro, spacious, narrow }: Props) => (
  <section className={[styles.band, spacious && styles.spacious].filter(Boolean).join(' ')}>
    <Container>
      <div className={[styles.content, narrow && styles.narrow].filter(Boolean).join(' ')}>
        <Breadcrumb current={page} />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
      </div>
    </Container>
  </section>
);
