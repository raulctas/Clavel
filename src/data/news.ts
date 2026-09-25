import { NewsCategory, NewsItem } from 'interfaces/news';

const PROVISIONAL_IMAGE = '/images/provisional/news-3x2.png';

/** Categorías del filtro de Noticias, en el orden en que se muestran. */
export const NEWS_CATEGORIES: NewsCategory[] = [
  'agriculture',
  'innovation',
  'fruitVegetables',
  'organic',
];

/**
 * Noticias, de la más reciente a la más antigua (Inicio muestra las tres
 * primeras). Para añadir una: darla de alta aquí y añadir su título y extracto
 * en cada `translation.json` (news.items.<id>).
 */
export const NEWS: NewsItem[] = [
  { id: 'mohamedKamel', category: 'innovation', image: PROVISIONAL_IMAGE },
  { id: 'erasmusLaboratory', category: 'innovation', image: PROVISIONAL_IMAGE },
  { id: 'agenda2030', category: 'agriculture', image: PROVISIONAL_IMAGE },
  { id: 'soilQuality', category: 'agriculture', image: PROVISIONAL_IMAGE },
  { id: 'fruitVegetables', category: 'fruitVegetables', image: PROVISIONAL_IMAGE },
  { id: 'citrusFertilisation', category: 'fruitVegetables', image: PROVISIONAL_IMAGE },
  { id: 'trialFields', category: 'organic', image: PROVISIONAL_IMAGE },
  { id: 'npkFertilisers', category: 'agriculture', image: PROVISIONAL_IMAGE },
  { id: 'soilPreparation', category: 'agriculture', image: PROVISIONAL_IMAGE },
];
