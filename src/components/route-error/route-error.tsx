import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { MessagePanel } from 'components/message-panel';

/**
 * Frontera de error de las rutas. Evita la pantalla de error por defecto de
 * React Router y ofrece una salida amable al usuario, sin perder cabecera y pie.
 */
export const RouteError = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  if (import.meta.env.DEV) {
    // Ayuda a depurar en desarrollo sin exponer nada en producción.
    console.error('Route error:', error);
  }

  return (
    <MessagePanel title={t('error.title')} text={t('error.text')} cta={t('error.cta')} hardReload />
  );
};
