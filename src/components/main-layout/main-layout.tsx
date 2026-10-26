import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from 'components/footer';
import { Header } from 'components/header';

import styles from './main-layout.module.css';

export const MainLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Vuelve al principio en cada cambio de página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* Primer elemento al pulsar Tab: salta el menú y lleva al contenido. */}
      <a href="#main" className={styles.skipLink}>
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
