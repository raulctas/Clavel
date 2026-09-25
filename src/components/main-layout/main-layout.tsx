import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from 'components/footer';
import { Header } from 'components/header';

import styles from './main-layout.module.css';

export const MainLayout = () => {
  const { pathname } = useLocation();

  // Vuelve al principio en cada cambio de página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
