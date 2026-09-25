/**
 * Datos de contacto de Clavel que no se traducen. La dirección sí cambia con el
 * idioma, por eso vive en `translation.json` (contact.address).
 *
 * Pendiente de confirmar: el correo es provisional y las redes sociales aún no
 * tienen URL (mientras valgan `undefined`, el icono se muestra sin enlace).
 */
export const COMPANY = {
  name: 'Clavel',
  email: 'info@clavel.es',
  phone: '+34 617 288 900',
  mobile: '+34 617 288 909',
} as const;

export type SocialNetwork = 'facebook' | 'instagram' | 'youtube' | 'linkedin' | 'tiktok';

export const SOCIAL_LINKS: Record<SocialNetwork, string | undefined> = {
  facebook: undefined,
  instagram: undefined,
  youtube: undefined,
  linkedin: undefined,
  tiktok: undefined,
};

/** Convierte un teléfono legible en un enlace `tel:` sin espacios. */
export const toTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
