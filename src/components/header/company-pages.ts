import { routes } from 'constants/routes';

/** Páginas de la empresa, agrupadas en «Empresa» en la barra de escritorio. */
export const COMPANY_PAGES = [
  { to: routes.aboutUs, labelKey: 'nav.aboutUs' },
  { to: routes.laboratory, labelKey: 'nav.laboratory' },
  { to: routes.production, labelKey: 'nav.production' },
];
