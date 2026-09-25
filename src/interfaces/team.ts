/**
 * Miembro del equipo. Mientras no estén confirmados, `name`, `photo`, `email`
 * y `linkedin` son opcionales: la ficha muestra un nombre de muestra, la foto
 * provisional con la etiqueta «Foto próximamente» y los botones de contacto
 * sin enlace. El cargo se traduce vía `translation.json` (team.roles.<roleKey>).
 */
export interface TeamMember {
  id: string;
  roleKey: string;
  name?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
}
