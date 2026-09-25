/**
 * Motivos de consulta del formulario de contacto, en el orden en que se
 * muestran. El texto de cada uno está en `translation.json`
 * (contact.form.reasons.<motivo>).
 */
export const CONTACT_REASONS = ['catalogue', 'productInfo', 'other'] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

export const isContactReason = (value: string | null): value is ContactReason =>
  CONTACT_REASONS.includes(value as ContactReason);
