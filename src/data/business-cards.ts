/**
 * Tarjetas de presentación: cada una tiene su página, /cards/<slug>, con la
 * imagen de la tarjeta, un enlace a la web y un botón para descargarla. Para
 * añadir una: copiar la imagen a `public/images/business-cards/<slug>.webp`, el
 * PNG en alta resolución a `<slug>.png` y darla de alta aquí.
 */
export interface BusinessCard {
  slug: string;
  /** Nombre de la persona, para el título de la pestaña y el texto alternativo. */
  name: string;
  image: string;
  /** PNG en alta resolución para «Descargar tarjeta». */
  download: string;
  /** Nombre con el que se guarda el fichero descargado. */
  downloadName: string;
}

export const BUSINESS_CARDS: BusinessCard[] = [
  {
    slug: 'libero-parri',
    name: 'Líbero Parri',
    image: '/images/business-cards/libero-parri.webp',
    download: '/images/business-cards/libero-parri.png',
    downloadName: 'Líbero Parri - Clavel Fertilizantes ECO.png',
  },
];

export const findBusinessCard = (slug: string | undefined) =>
  BUSINESS_CARDS.find((card) => card.slug === slug);
