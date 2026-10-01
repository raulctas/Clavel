import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Container } from 'components/container';
import { NewsCard } from 'components/news-card';
import { PageHeader } from 'components/page-header';
import { RichText } from 'components/rich-text';
import { TextLink } from 'components/text-link';
import { newsCategoryPath, routes } from 'constants/routes';
import { findNewsBySlug, getRelatedNews } from 'data/news';
import { usePageTitle } from 'hooks/use-page-title';
import { NewsItem } from 'interfaces/news';
import { NotFound } from 'pages/not-found';

import { VideoEmbed } from './components/video-embed';
import styles from './news-detail.module.css';

/** Página de una noticia: /news/<slug>. Un slug desconocido muestra la página 404. */
export const NewsDetail = () => {
  const { slug } = useParams();
  const item = findNewsBySlug(slug);

  return item ? <NewsArticle item={item} /> : <NotFound />;
};

const NewsArticle = ({ item }: { item: NewsItem }) => {
  const { t } = useTranslation();
  const title = t(`news.items.${item.id}.title`);
  const body = t(`news.items.${item.id}.body`, { returnObjects: true }) as string[];
  const related = getRelatedNews(item);
  usePageTitle(title);

  return (
    <>
      <PageHeader
        page={title}
        parent={{ label: t('nav.news'), to: routes.news }}
        title={title}
        intro={t(`news.items.${item.id}.excerpt`)}
        // La foto de la noticia solo se muestra aquí, en la banda de título.
        image={item.headerImage ?? item.image}
      />

      <Container as="article" className={styles.article}>
        <div className={styles.content}>
          {/* Categoría: abre Noticias con ese filtro aplicado. */}
          <Link to={newsCategoryPath(item.category)} className={styles.category}>
            {t(`news.categories.${item.category}`)}
          </Link>
          <RichText blocks={body} />
          {item.videos?.map((videoId) => (
            <VideoEmbed key={videoId} videoId={videoId} title={t('news.videoTitle', { title })} />
          ))}
          <TextLink to={routes.news} className={styles.back} back>
            {t('news.backToNews')}
          </TextLink>
        </div>
      </Container>

      {related.length > 0 && (
        <section className={styles.related}>
          <Container className={styles.relatedInner}>
            <h2 className={styles.relatedTitle}>{t('news.relatedTitle')}</h2>
            <div className={styles.relatedGrid}>
              {related.map((other) => (
                <NewsCard key={other.id} item={other} variant="compact" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
};
