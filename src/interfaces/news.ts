export type NewsCategory = 'agriculture' | 'innovation' | 'fruitVegetables' | 'organic';

/**
 * Noticia. El título, el extracto y el cuerpo están en `translation.json`
 * (news.items.<id>); `slug` es su dirección: /news/<slug>.
 */
export interface NewsItem {
  id: string;
  slug: string;
  category: NewsCategory;
  image: string;
  /** Identificadores de vídeos de YouTube que acompañan a la noticia. */
  videos?: string[];
}
