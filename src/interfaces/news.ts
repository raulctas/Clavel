export type NewsCategory = 'agriculture' | 'innovation' | 'fruitVegetables' | 'organic';

/**
 * Noticia. El título y el extracto están en `translation.json`
 * (news.items.<id>). `href` es opcional: cuando la noticia tenga página propia,
 * la tarjeta enlazará a ella.
 */
export interface NewsItem {
  id: string;
  category: NewsCategory;
  image: string;
  href?: string;
}
