/**
 * Tarjetas de presentación: cada una tiene su página, /card/<slug>, con la
 * imagen de la tarjeta y un enlace a la web. Para añadir una: copiar la imagen
 * a `public/images/business-cards/<slug>.webp` y darla de alta aquí.
 */
export interface BusinessCard {
  slug: string;
  /** Nombre de la persona, para el título de la pestaña y el texto alternativo. */
  name: string;
  image: string;
}

export const BUSINESS_CARDS: BusinessCard[] = [
  {
    slug: 'libero-parri',
    name: 'Líbero Parri',
    image: '/images/business-cards/libero-parri.webp',
  },
];

export const findBusinessCard = (slug: string | undefined) =>
  BUSINESS_CARDS.find((card) => card.slug === slug);
