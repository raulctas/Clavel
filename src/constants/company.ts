/**
 * Datos de contacto de Clavel que no se traducen. La dirección sí cambia con el
 * idioma, por eso vive en `translation.json` (contact.address).
 */
export const COMPANY = {
  name: 'Clavel',
  email: 'info@agro-clavel.com',
  phone: '+34 629 49 17 60',
} as const;

/** Convierte un teléfono legible en un enlace `tel:` sin espacios. */
export const toTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
