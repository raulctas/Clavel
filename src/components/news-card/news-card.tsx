import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { NewsItem } from 'interfaces/news';

import styles from './news-card.module.css';

interface Props {
  item: NewsItem;
  /**
   * `compact`: la de «Últimas noticias» en Inicio (fondo blanco, sin extracto).
   * `full`: la de la página de Noticias (con borde, extracto y «Leer más»).
   */
  variant?: 'compact' | 'full';
  /** Enlace de la tarjeta. Si no se indica, se usa el de la propia noticia. */
  to?: string;
}

export const NewsCard = ({ item, variant = 'full', to = item.href }: Props) => {
  const { t } = useTranslation();

  const content = (
    <>
      <img
        src={item.image}
        alt=""
        className={styles.image}
        width={1200}
        height={800}
        loading="lazy"
      />
      <div className={styles.body}>
        <p className={styles.category}>{t(`news.categories.${item.category}`)}</p>
        <h3 className={styles.title}>{t(`news.items.${item.id}.title`)}</h3>
        {variant === 'full' && (
          <>
            <p className={styles.excerpt}>{t(`news.items.${item.id}.excerpt`)}</p>
            <span className={styles.readMore}>{t('common.readMore')}</span>
          </>
        )}
      </div>
    </>
  );

  const classes = [styles.card, styles[variant], to && styles.interactive]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes}>
      {to ? (
        <Link to={to} className={styles.inner}>
          {content}
        </Link>
      ) : (
        <div className={styles.inner}>{content}</div>
      )}
    </article>
  );
};
