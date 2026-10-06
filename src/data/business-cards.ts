/**
 * Tarjetas de presentación: cada una tiene su página, /cards/<slug>, con la
 * tarjeta construida en la web (datos pulsables) y los botones «Guardar
 * contacto», «Descargar tarjeta» y «Visita nuestra web». Para añadir una:
 * - darla de alta aquí con sus datos;
 * - el PNG de la tarjeta, para descargarla, en `public/images/business-cards/<slug>.png`;
 * - la ficha de contacto en `public/vcards/<slug>.vcf` (copiar la de otra y cambiar los datos).
 */
export interface BusinessCard {
  slug: string;
  /** Nombre de la persona, tal como aparece en la tarjeta. */
  name: string;
  /** Teléfono tal como se muestra («+34 629 49 17 60»). */
  phone: string;
  email: string;
  /** Web sin protocolo, tal como se muestra («agro-clavel.com»). */
  website: string;
  /** PNG en alta resolución para «Descargar tarjeta». */
  download: string;
  /** Nombre con el que se guarda el fichero descargado. */
  downloadName: string;
  /** Ficha de contacto (vCard) para «Guardar contacto». */
  vcard: string;
}

export const BUSINESS_CARDS: BusinessCard[] = [
  {
    slug: 'libero-parri',
    name: 'Líbero Parri',
    phone: '+34 629 49 17 60',
    email: 'info@agro-clavel.com',
    website: 'agro-clavel.com',
    download: '/images/business-cards/libero-parri.png',
    downloadName: 'Líbero Parri - Clavel Fertilizantes ECO.png',
    vcard: '/vcards/libero-parri.vcf',
  },
];

export const findBusinessCard = (slug: string | undefined) =>
  BUSINESS_CARDS.find((card) => card.slug === slug);
