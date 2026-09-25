import { TeamMember } from 'interfaces/team';

/**
 * Integrantes del equipo. Nombres, fotos y contactos están pendientes: cuando
 * lleguen, basta con copiar la foto (4:5) a `public/images/team/` y rellenar
 * aquí `name`, `photo: '/images/team/<archivo>'`, `email` y `linkedin`.
 */
export const TEAM: TeamMember[] = [
  { id: 'general-management', roleKey: 'generalManagement' },
  { id: 'technical-direction', roleKey: 'technicalDirection' },
  { id: 'sales-support', roleKey: 'salesSupport' },
];

/** Foto de muestra mientras un miembro no tenga la suya. */
export const TEAM_PHOTO_PLACEHOLDER = '/images/provisional/team-4x5.png';
