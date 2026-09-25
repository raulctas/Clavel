import styles from './page-loader.module.css';

/** Se muestra mientras se cargan los textos del idioma (Suspense de i18next). */
export const PageLoader = () => (
  <div className={styles.loader}>
    <div className={styles.spinner} role="status" aria-label="Loading" />
  </div>
);
