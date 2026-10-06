/**
 * Motivos de consulta del formulario de contacto, en el orden en que se
 * muestran. Los botones que llevan a Contactar pueden dejar uno ya elegido
 * («Solicitar el catálogo de…» en cada gama → catalogue, «Solicitar
 * información» en cada ficha → productInfo). El texto de cada uno está en
 * `translation.json` (contact.form.reasons.<motivo>) y su mensaje por defecto, en
 * contact.form.defaultMessage.<motivo>.
 */
export const CONTACT_REASONS = [
  'catalogue',
  'advice',
  'productInfo',
  'distributor',
  'job',
  'other',
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

export const isContactReason = (value: string | null): value is ContactReason =>
  CONTACT_REASONS.includes(value as ContactReason);
