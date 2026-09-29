import { NewsCategory, NewsItem } from 'interfaces/news';

/** Imagen de una noticia: `public/images/news/<slug>.jpg`. */
const newsImage = (slug: string) => `/images/news/${slug}.jpg`;

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
    id: 'agenda2030',
    slug: 'agenda-2030',
    category: 'agriculture',
    image: newsImage('agenda-2030'),
  },
  {
    id: 'soilQuality',
    slug: 'soil-quality',
    category: 'agriculture',
    image: newsImage('soil-quality'),
  },
  {
    id: 'fruitVegetables',
    slug: 'fruit-vegetables',
    category: 'fruitVegetables',
    image: newsImage('fruit-vegetables'),
    videos: ['4hBg74CwdrA', 'YRNSerMEc04'],
  },
  {
    id: 'citrusFertilisation',
    slug: 'citrus-fertilisation',
    category: 'fruitVegetables',
    image: newsImage('citrus-fertilisation'),
    videos: ['Av6-vaycs7U'],
  },
  {
    id: 'trialFields',
    slug: 'trial-fields',
    category: 'organic',
    image: newsImage('trial-fields'),
  },
  {
    id: 'npkFertilisers',
    slug: 'npk-fertilisers',
    category: 'agriculture',
    image: newsImage('npk-fertilisers'),
  },
  {
    id: 'soilPreparation',
    slug: 'soil-preparation',
    category: 'agriculture',
    image: newsImage('soil-preparation'),
  },
  {
    id: 'pollinators',
    slug: 'organic-fertilisers-pollinators',
    category: 'organic',
    image: newsImage('organic-fertilisers-pollinators'),
  },
  {
    id: 'organicCrops',
    slug: 'organic-crops',
    category: 'organic',
    image: newsImage('organic-crops'),
  },
  {
    id: 'agricultureDrones',
    slug: 'fertilisers-applied-by-drone',
    category: 'innovation',
    image: newsImage('fertilisers-applied-by-drone'),
  },
  {
    id: 'organicConsumption',
    slug: 'organic-fruit-vegetables-consumption',
    category: 'fruitVegetables',
    image: newsImage('organic-fruit-vegetables-consumption'),
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
