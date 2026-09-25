import { useEffect } from 'react';

import { COMPANY } from 'constants/company';

/** Título por defecto, el de `index.html` (el que se ve en Inicio). */
const DEFAULT_TITLE = document.title;

/**
 * Pone el título de la pestaña del navegador: «<página> · Clavel». Sin página
 * (Inicio) se deja el título por defecto.
 */
export const usePageTitle = (page?: string) => {
  useEffect(() => {
    document.title = page ? `${page} · ${COMPANY.name}` : DEFAULT_TITLE;
  }, [page]);
};
