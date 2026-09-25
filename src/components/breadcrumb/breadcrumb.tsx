import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from 'constants/routes';

import styles from './breadcrumb.module.css';

interface Props {
  /** Nombre de la página actual. */
  current: string;
}

/** Ruta «Inicio / Página» de las bandas de título. */
export const Breadcrumb = ({ current }: Props) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('common.breadcrumb')}>
      <ol className={styles.list}>
        <li>
          <Link to={routes.home} className={styles.link}>
            {t('nav.home')}
          </Link>
        </li>
        <li className={styles.current} aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
};
