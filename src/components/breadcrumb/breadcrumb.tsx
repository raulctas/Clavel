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
  /** Nivel intermedio, p. ej. «Noticias» en la página de una noticia. */
  parent?: BreadcrumbParent;
}

/** Ruta «Inicio / [Sección /] Página» de las bandas de título. */
export const Breadcrumb = ({ current, parent }: Props) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('common.breadcrumb')}>
      <ol className={styles.list}>
        <li>
          <Link to={routes.home} className={styles.link}>
            {t('nav.home')}
          </Link>
        </li>
        {parent && (
          <li className={styles.separated}>
            <Link to={parent.to} className={styles.link}>
              {parent.label}
            </Link>
          </li>
        )}
        <li className={`${styles.separated} ${styles.current}`} aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
};
