import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { Download, UserPlus } from 'lucide-react';

import { routes } from 'constants/routes';
import { findBusinessCard } from 'data/business-cards';
import { usePageTitle } from 'hooks/use-page-title';

import { CardMockup } from './components/card-mockup';

import styles from './business-card.module.css';

/**
 * Página de una tarjeta de presentación: /cards/<slug>. Página sencilla, sin la
 * cabecera ni el pie del resto de la web: la tarjeta (construida en la web, con
 * teléfono, correo y web pulsables) y, debajo, «Guardar contacto» (vCard) y
 * «Descargar tarjeta» (PNG en alta resolución). La web ya se abre desde la propia
 * tarjeta. Es para compartir (p. ej. con un código QR), así que no se indexa. Una tarjeta
 * desconocida lleva a Inicio.
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
      <CardMockup card={card} />
      <div className={styles.actions}>
        {/* Sin `download`: en el móvil, la ficha se abre directamente en Contactos. */}
        <a href={card.vcard} className={styles.link}>
          <UserPlus size={18} aria-hidden />
          {t('businessCard.saveContact')}
        </a>
        <a href={card.download} download={card.downloadName} className={styles.secondary}>
          <Download size={18} aria-hidden />
          {t('businessCard.download')}
        </a>
      </div>
    </main>
  );
};
