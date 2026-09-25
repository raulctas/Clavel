import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { NewsCard } from 'components/news-card';
import { PageHeader } from 'components/page-header';
import { NEWS, NEWS_CATEGORIES } from 'data/news';
import { usePageTitle } from 'hooks/use-page-title';
import { NewsCategory } from 'interfaces/news';

import styles from './news.module.css';

type CategoryFilter = NewsCategory | 'all';

const FILTERS: CategoryFilter[] = ['all', ...NEWS_CATEGORIES];

export const News = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState<CategoryFilter>('all');
  usePageTitle(t('nav.news'));

  const filteredNews =
    category === 'all' ? NEWS : NEWS.filter((item) => item.category === category);

  return (
    <>
      <PageHeader page={t('nav.news')} title={t('news.title')} intro={t('news.intro')} />

      <Container as="section" className={styles.section}>
        <div className={styles.filters} role="group" aria-label={t('news.filterLabel')}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={filter === category}
              className={[styles.chip, filter === category && styles.chipActive]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setCategory(filter)}
            >
              {t(`news.categories.${filter}`)}
            </button>
          ))}
        </div>

        {filteredNews.length > 0 ? (
          <div className={styles.grid}>
            {filteredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{t('news.empty')}</p>
        )}
      </Container>
    </>
  );
};
