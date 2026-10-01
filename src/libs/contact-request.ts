/** Script del hosting que envía el correo (`public/api/contact.php`). */
export const CONTACT_ENDPOINT = '/api/contact.php';

export interface ContactRequest {
  subject: string;
  /** Líneas «Etiqueta: valor» ya traducidas, en el orden del formulario. */
  lines: string[];
  /** Datos que el servidor vuelve a validar (y el correo para responder). */
  name: string;
  email: string;
  phone: string;
  privacy: boolean;
  /** Campo trampa contra robots: las personas lo dejan vacío. */
  website: string;
}

/**
 * Envía una consulta del formulario de contacto. El script del servidor la
 * manda por correo a info@agro-clavel.com (el destinatario está fijado allí).
 * Lanza un error si no se ha podido enviar, para que el formulario lo muestre.
 */
export const sendContactRequest = async (request: ContactRequest) => {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!response.ok || !result?.ok) {
    throw new Error(`Contact request failed (${response.status})`);
  }
};
