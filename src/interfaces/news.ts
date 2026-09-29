export type NewsCategory = 'agriculture' | 'innovation' | 'fruitVegetables' | 'organic';

/**
 * Noticia. El título, el extracto y el cuerpo están en `translation.json`
 * (news.items.<id>); `slug` es su dirección: /news/<slug>.
 */
export interface NewsItem {
  id: string;
  slug: string;
  category: NewsCategory;
  /** Imagen de la tarjeta y, si no hay `headerImage`, de la banda de título. */
  image: string;
  /**
   * Versión de la imagen para la banda de título, cuando `image` no encaja bajo
   * el texto (p. ej. un logo centrado que quedaría detrás del título).
   */
  headerImage?: string;
  /** Identificadores de vídeos de YouTube que acompañan a la noticia. */
  videos?: string[];
}
