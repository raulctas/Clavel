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
 * primeras). Para añadir una: darla de alta aquí y añadir su título, extracto
 * y cuerpo en cada `translation.json` (news.items.<id>).
 */
export const NEWS: NewsItem[] = [
  {
    id: 'mohamedKamel',
    slug: 'mohamed-kamel-plant-nutrition',
    category: 'innovation',
    image: PROVISIONAL_IMAGE,
  },
  {
    id: 'erasmusLaboratory',
    slug: 'erasmus-laboratory',
    category: 'innovation',
    image: PROVISIONAL_IMAGE,
  },
  {
    id: 'erasmusMarketing',
    slug: 'erasmus-marketing-team',
    category: 'innovation',
    image: PROVISIONAL_IMAGE,
  },
  { id: 'agenda2030', slug: 'agenda-2030', category: 'agriculture', image: PROVISIONAL_IMAGE },
  { id: 'soilQuality', slug: 'soil-quality', category: 'agriculture', image: PROVISIONAL_IMAGE },
  {
    id: 'fruitVegetables',
    slug: 'fruit-vegetables',
    category: 'fruitVegetables',
    image: PROVISIONAL_IMAGE,
    videos: ['4hBg74CwdrA', 'YRNSerMEc04'],
  },
  {
    id: 'citrusFertilisation',
    slug: 'citrus-fertilisation',
    category: 'fruitVegetables',
    image: PROVISIONAL_IMAGE,
    videos: ['Av6-vaycs7U'],
  },
  { id: 'trialFields', slug: 'trial-fields', category: 'organic', image: PROVISIONAL_IMAGE },
  {
    id: 'npkFertilisers',
    slug: 'npk-fertilisers',
    category: 'agriculture',
    image: PROVISIONAL_IMAGE,
  },
  {
    id: 'soilPreparation',
    slug: 'soil-preparation',
    category: 'agriculture',
    image: PROVISIONAL_IMAGE,
  },
  {
    id: 'pollinators',
    slug: 'organic-fertilisers-pollinators',
    category: 'organic',
    image: PROVISIONAL_IMAGE,
  },
  { id: 'organicCrops', slug: 'organic-crops', category: 'organic', image: PROVISIONAL_IMAGE },
  {
    id: 'agricultureDrones',
    slug: 'fertilisers-applied-by-drone',
    category: 'innovation',
    image: PROVISIONAL_IMAGE,
  },
  {
    id: 'organicConsumption',
    slug: 'organic-fruit-vegetables-consumption',
    category: 'fruitVegetables',
    image: PROVISIONAL_IMAGE,
  },
];

export const findNewsBySlug = (slug: string | undefined) => NEWS.find((item) => item.slug === slug);

/**
 * Noticias relacionadas: primero las de la misma categoría y, si no llegan,
 * las más recientes. Nunca incluye la propia noticia.
 */
export const getRelatedNews = (item: NewsItem, count = 3) => {
  const others = NEWS.filter((other) => other.id !== item.id);
  const sameCategory = others.filter((other) => other.category === item.category);
  const rest = others.filter((other) => other.category !== item.category);
  return [...sameCategory, ...rest].slice(0, count);
};
