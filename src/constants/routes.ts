/**
 * Mapa central de rutas de la aplicación. Cualquier navegación (Link, NavLink)
 * debe usar estas constantes en lugar de strings literales.
 */
export const routes = {
  home: '/',
  aboutUs: '/about-us',
  news: '/news',
  team: '/team',
  contact: '/contact',
} as const;

/** Parámetro de la URL de Contactar que preselecciona el motivo de la consulta. */
export const CONTACT_REASON_PARAM = 'reason';

/** Ruta de Contactar con el motivo «catálogo» ya elegido. */
export const catalogueRequestPath = `${routes.contact}?${CONTACT_REASON_PARAM}=catalogue`;
