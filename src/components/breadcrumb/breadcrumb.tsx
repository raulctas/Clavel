import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from 'constants/routes';

import styles from './breadcrumb.module.css';

export interface BreadcrumbParent {
  label: string;
  to: string;
}

interface Props {
  /** Nombre de la página actual. */
  current: string;
  /**
   * Niveles intermedios, de más general a más concreto: p. ej. «Noticias» en
   * una noticia, o «Productos» y la gama en la ficha de un producto.
   */
  parent?: BreadcrumbParent | BreadcrumbParent[];
}

/** Ruta «Inicio / [Secciones /] Página» de las bandas de título. */
export const Breadcrumb = ({ current, parent }: Props) => {
  const { t } = useTranslation();
  const parents = parent ? ([] as BreadcrumbParent[]).concat(parent) : [];

  return (
    <nav aria-label={t('common.breadcrumb')}>
      <ol className={styles.list}>
        <li>
          <Link to={routes.home} className={styles.link}>
            {t('nav.home')}
          </Link>
        </li>
        {parents.map((item) => (
          <li key={item.to} className={styles.separated}>
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
        <li className={`${styles.separated} ${styles.current}`} aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
};
