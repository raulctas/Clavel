import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

import { routes } from 'constants/routes';
import { findBusinessCard } from 'data/business-cards';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './business-card.module.css';

/**
 * Página de una tarjeta de presentación: /card/<slug>. Página sencilla, sin la
 * cabecera ni el pie del resto de la web: la tarjeta arriba y, debajo, los
 * botones «Descargar tarjeta» (PNG en alta resolución) y «Visita nuestra web». Es para compartir (p. ej. con un código QR), así que no se indexa.
 * Una tarjeta desconocida lleva a Inicio.
 */
export const BusinessCard = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const card = findBusinessCard(slug);
  usePageTitle(card?.name);

  // Fuera de los buscadores: es una página para compartir, no para encontrar.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  if (!card) {
    return <Navigate to={routes.home} replace />;
  }

  return (
    <main className={styles.page}>
      <img
        src={card.image}
        alt={t('businessCard.alt', { name: card.name })}
        className={styles.card}
        width={1360}
        height={880}
      />
      <div className={styles.actions}>
        <a href={card.download} download={card.downloadName} className={styles.secondary}>
          <Download size={18} aria-hidden />
          {t('businessCard.download')}
        </a>
        <Link to={routes.home} className={styles.link}>
          {t('businessCard.visitWebsite')}
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </main>
  );
};
