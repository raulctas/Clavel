import i18n from 'i18next';

import { SUPPORTED_LANGUAGES } from 'constants/languages';
import { newsDetailPath, productPath, productRangePath, routes } from 'constants/routes';
import { NEWS } from 'data/news';
import { PRODUCT_RANGES, PRODUCTS } from 'data/products';

/**
 * Buscador de la web (issue #34). Busca en los textos de todos los idiomas a la
 * vez, no solo en el activo: cada página de destino es un «documento» con sus
 * textos en cada idioma. Los resultados se muestran por grupos: primero los
 * productos, después las noticias y por último el resto de páginas; dentro de
 * cada grupo, los que mejor coinciden (en el título antes que en el texto). Para
 * elegir cuáles entran en el máximo, cuentan antes los que coinciden en el
 * título: así una página llamada como lo buscado (la gama «Terra») no queda
 * fuera por noticias que solo lo mencionan.
 */

/** Caracteres mínimos para buscar. */
export const MIN_QUERY_LENGTH = 3;
/** Resultados como máximo. */
export const MAX_RESULTS = 5;

export type SearchResultType = 'product' | 'news' | 'page';

/** Orden de los grupos de resultados. */
const TYPE_PRIORITY: Record<SearchResultType, number> = { product: 0, news: 1, page: 2 };

type Resources = Record<string, Record<string, unknown>>;

interface SearchDocument {
  type: SearchResultType;
  path: string;
  /** Clave del título y del subtítulo que se muestran (en el idioma activo). */
  titleKey: string;
  subtitleKey?: string;
  /** Título literal (nombre de producto), igual en todos los idiomas. */
  title?: string;
  /** Desempate dentro del grupo: el orden en que aparece en la web. */
  order: number;
  /** Por idioma: título y textos del cuerpo, ya en texto plano. */
  texts: Record<string, { title: string; body: string[] }>;
}

/** Índice del buscador: un documento por página de destino. */
export type SearchIndex = SearchDocument[];

export interface SearchResult {
  type: SearchResultType;
  path: string;
  titleKey: string;
  subtitleKey?: string;
  title?: string;
  /** Fragmento con la coincidencia y el idioma en que se ha encontrado. */
  snippet?: { text: string; language: string };
}

/** Minúsculas y sin tildes, para que «fosforo» encuentre «fósforo». */
export const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Todos los textos de un valor de traducción (cadena, lista u objeto), sin etiquetas. */
const flatten = (value: unknown): string[] => {
  if (typeof value === 'string') {
    // Fuera las etiquetas de <Trans> y los marcadores {{…}}.
    const text = value
      .replace(/<\/?[a-zA-Z]+>/g, '')
      .replace(/\{\{[^}]+\}\}/g, '')
      .trim();
    return text ? [text] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(flatten);
  }
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(flatten);
  }
  return [];
};

/** Valor de una ruta «a.b.c» dentro de los textos de un idioma. */
const pick = (resource: Record<string, unknown>, path: string): unknown =>
  path.split('.').reduce<unknown>((value, key) => {
    if (value && typeof value === 'object') {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, resource);

/** Carga los textos de los cinco idiomas (los que aún no estén cargados). */
export const loadSearchResources = async (): Promise<Resources> => {
  const languages = SUPPORTED_LANGUAGES.map((language) => language.code);
  await i18n.loadLanguages(languages);
  return Object.fromEntries(
    languages.map((code) => [code, i18n.getResourceBundle(code, 'translation') ?? {}]),
  );
};

/**
 * Páginas que no son productos ni noticias: su título (clave), su subtítulo y
 * las partes de los textos que contienen.
 */
const PAGES: { path: string; titleKey: string; subtitleKey?: string; keys: string[] }[] = [
  ...PRODUCT_RANGES.map((range) => ({
    path: productRangePath(range.key),
    titleKey: `products.ranges.${range.key}.title`,
    subtitleKey: `products.ranges.${range.key}.intro`,
    keys: [`products.ranges.${range.key}`],
  })),
  {
    path: routes.products,
    titleKey: 'products.title',
    subtitleKey: 'products.intro',
    keys: ['products.title', 'products.intro'],
  },
  {
    path: routes.allProducts,
    titleKey: 'products.all.title',
    subtitleKey: 'products.all.intro',
    keys: ['products.all'],
  },
  {
    path: routes.home,
    titleKey: 'nav.home',
    subtitleKey: 'home.hero.title',
    keys: ['home', 'pillars'],
  },
  {
    path: routes.aboutUs,
    titleKey: 'nav.aboutUs',
    subtitleKey: 'aboutUs.intro',
    keys: ['aboutUs'],
  },
  {
    path: routes.laboratory,
    titleKey: 'nav.laboratory',
    subtitleKey: 'laboratory.intro',
    keys: ['laboratory'],
  },
  {
    path: routes.production,
    titleKey: 'nav.production',
    subtitleKey: 'production.intro',
    keys: ['production'],
  },
  {
    path: routes.news,
    titleKey: 'nav.news',
    subtitleKey: 'news.intro',
    keys: ['news.title', 'news.intro'],
  },
  {
    path: routes.contact,
    titleKey: 'nav.contact',
    subtitleKey: 'contact.intro',
    keys: ['contact.title', 'contact.intro', 'contact.address', 'contact.form.reasons'],
  },
  {
    path: routes.privacy,
    titleKey: 'nav.privacy',
    subtitleKey: 'privacy.intro',
    keys: ['privacy'],
  },
];

/** Construye los documentos del buscador a partir de los textos de todos los idiomas. */
export const buildSearchIndex = (resources: Resources): SearchIndex => {
  const languages = Object.keys(resources);
  const textsFor = (title: (code: string) => string, keys: (code: string) => string[]) =>
    Object.fromEntries(
      languages.map((code) => [
        code,
        {
          title: title(code),
          body: keys(code).flatMap((key) => flatten(pick(resources[code], key))),
        },
      ]),
    );
  const text = (code: string, key: string) => flatten(pick(resources[code], key)).join(' ');

  const products: SearchDocument[] = PRODUCTS.map((product, order) => ({
    type: 'product',
    path: productPath(product.range, product.slug),
    titleKey: '',
    title: product.name,
    subtitleKey: `products.items.${product.slug}.function`,
    order,
    texts: textsFor(
      () => product.name,
      () => [`products.items.${product.slug}`, `products.ranges.${product.range}.title`],
    ),
  }));

  const news: SearchDocument[] = NEWS.map((item, order) => ({
    type: 'news',
    path: newsDetailPath(item.slug),
    titleKey: `news.items.${item.id}.title`,
    subtitleKey: `news.items.${item.id}.excerpt`,
    order,
    texts: textsFor(
      (code) => text(code, `news.items.${item.id}.title`),
      () => [
        `news.items.${item.id}.excerpt`,
        `news.items.${item.id}.body`,
        `news.categories.${item.category}`,
      ],
    ),
  }));

  const pages: SearchDocument[] = PAGES.map((page, order) => ({
    type: 'page',
    path: page.path,
    titleKey: page.titleKey,
    subtitleKey: page.subtitleKey,
    order,
    texts: textsFor(
      (code) => text(code, page.titleKey),
      () => page.keys,
    ),
  }));

  return [...products, ...news, ...pages];
};

/** Fragmento de unos 140 caracteres alrededor de la primera coincidencia. */
const excerpt = (text: string, term: string) => {
  const index = normalize(text).indexOf(term);
  if (index < 0) {
    return undefined;
  }
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + term.length + 90);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
};

/**
 * Busca `query` en todos los idiomas. Cada palabra de la búsqueda tiene que
 * aparecer en los textos de un mismo idioma. Prioriza el idioma activo para el
 * fragmento que se muestra.
 */
export const search = (
  index: SearchIndex,
  query: string,
  currentLanguage: string,
): SearchResult[] => {
  const normalized = normalize(query.trim());
  if (normalized.length < MIN_QUERY_LENGTH) {
    return [];
  }
  const terms = normalized.split(/\s+/).filter(Boolean);

  const scored = index.flatMap((document) => {
    // El idioma activo primero: si coincide en él, el fragmento sale en ese idioma.
    const languages = [
      currentLanguage,
      ...Object.keys(document.texts).filter((code) => code !== currentLanguage),
    ].filter((code) => document.texts[code]);

    let best: { score: number; language: string; inTitle: boolean } | undefined;
    for (const language of languages) {
      const { title, body } = document.texts[language];
      const normalizedTitle = normalize(title);
      const normalizedBody = normalize(body.join(' '));
      if (!terms.every((term) => normalizedTitle.includes(term) || normalizedBody.includes(term))) {
        continue;
      }
      const score = terms.reduce((total, term) => {
        const inTitle = normalizedTitle.includes(term);
        const titleStart = normalizedTitle.startsWith(term) || normalizedTitle.includes(` ${term}`);
        const wordStart = new RegExp(
          `(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
        ).test(normalizedBody);
        const occurrences = Math.min(5, normalizedBody.split(term).length - 1);
        return (
          total + (inTitle ? 100 : 0) + (titleStart ? 50 : 0) + (wordStart ? 10 : 0) + occurrences
        );
      }, 0);
      const inTitle = terms.some((term) => normalizedTitle.includes(term));
      if (!best || score > best.score) {
        best = { score, language, inTitle };
      }
    }
    return best ? [{ document, ...best }] : [];
  });

  type Scored = (typeof scored)[number];
  const byType = (a: Scored, b: Scored) =>
    TYPE_PRIORITY[a.document.type] - TYPE_PRIORITY[b.document.type] ||
    b.score - a.score ||
    a.document.order - b.document.order;

  return (
    scored
      // Qué entra en el máximo: antes los que coinciden en el título.
      .sort((a, b) => Number(b.inTitle) - Number(a.inTitle) || byType(a, b))
      .slice(0, MAX_RESULTS)
      // Cómo se muestran: productos, noticias y el resto, y en cada grupo los mejores.
      .sort(byType)
      .map(({ document, language }) => {
        const body = document.texts[language].body;
        const fragment = body
          .map((text) => excerpt(text, terms[0]))
          .find((text): text is string => Boolean(text));
        return {
          type: document.type,
          path: document.path,
          titleKey: document.titleKey,
          subtitleKey: document.subtitleKey,
          title: document.title,
          snippet: fragment ? { text: fragment, language } : undefined,
        };
      })
  );
};
