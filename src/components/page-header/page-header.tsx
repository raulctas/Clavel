import { Breadcrumb, BreadcrumbParent } from 'components/breadcrumb';
import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';

import styles from './page-header.module.css';

interface Props {
  /** Nombre de la página, para la ruta de navegación. */
  page: string;
  /** Nivel o niveles intermedios de la ruta de navegación (p. ej. Noticias). */
  parent?: BreadcrumbParent | BreadcrumbParent[];
  /** Antetítulo sobre el H1 (p. ej. la categoría de una noticia). */
  eyebrow?: string;
  title: string;
  intro: string;
  /** Imagen de fondo, decorativa. Se muestra atenuada para que el texto se lea bien. */
  image: string;
}

/**
 * Banda de título de las páginas interiores: imagen de fondo atenuada sobre
 * crema, ruta, H1 y entrada. Todas las páginas (salvo Inicio, que tiene su
 * portada) la usan con el mismo alto y el mismo formato. Es el primer bloque de
 * la página, así que lleva el hueco de la cabecera flotante.
 */
export const PageHeader = ({ page, parent, eyebrow, title, intro, image }: Props) => (
  <section className={styles.band}>
    <img src={image} alt="" className={styles.background} />
    <div className={styles.veil} aria-hidden />
    <Container className={styles.container}>
      <div className={styles.content}>
        <Breadcrumb current={page} parent={parent} />
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
      </div>
    </Container>
  </section>
);
