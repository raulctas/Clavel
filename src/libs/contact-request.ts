import { COMPANY } from 'constants/company';

export interface ContactRequest {
  subject: string;
  /** Líneas «Etiqueta: valor» ya traducidas, en el orden del formulario. */
  lines: string[];
}

/**
 * Envía una consulta del formulario de contacto.
 *
 * PENDIENTE DE BACKEND: mientras no exista un servicio de envío, se abre el
 * cliente de correo del usuario con la consulta ya redactada para
 * `COMPANY.email`. Cuando haya backend, basta con sustituir el cuerpo de esta
 * función por la llamada (p. ej. `fetch('/api/contact', …)`); el formulario no
 * necesita cambios.
 */
export const sendContactRequest = async ({ subject, lines }: ContactRequest) => {
  const body = lines.join('\n');
  window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
};
