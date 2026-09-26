import { useTranslation } from 'react-i18next';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';
import { IconCircle } from 'components/icon-circle';
import { NewsCard } from 'components/news-card';
import { TextLink } from 'components/text-link';
import { catalogueRequestPath, routes } from 'constants/routes';
import { NEWS } from 'data/news';
import { PILLARS } from 'data/pillars';
import { usePageTitle } from 'hooks/use-page-title';

import { HeroSlideshow } from './components/hero-slideshow';
import styles from './home.module.css';

const LATEST_NEWS = NEWS.slice(0, 3);
const PROVISIONAL_IMAGE = '/images/provisional/news-3x2.png';

export const Home = () => {
  const { t } = useTranslation();
  usePageTitle();

  return (
    <>
      <HeroSlideshow />

      {/* Pilares */}
      <section className={styles.cream}>
        <Container className={styles.pillarsBlock}>
          <h2 className={`${styles.sectionTitle} ${styles.pillarsTitle}`}>
            {t('home.pillarsTitle')}
          </h2>
          <ul className={styles.pillars}>
            {PILLARS.map(({ key, icon }) => (
              <li key={key} className={`${styles.pillar} hover-lift`}>
                <IconCircle icon={icon} />
                <h3 className={styles.pillarTitle}>{t(`pillars.${key}.title`)}</h3>
                <p className={styles.pillarText}>{t(`pillars.${key}.text`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Laboratorio y Fabricación */}
      <Container as="section" className={styles.features}>
        <div className={styles.featureRow}>
          <img
            src={PROVISIONAL_IMAGE}
            alt=""
            className={styles.featureImage}
            width={1200}
            height={800}
            loading="lazy"
          />
          <div className={styles.featureText}>
            <Eyebrow>{t('home.lab.eyebrow')}</Eyebrow>
            <h2 className={styles.sectionTitle}>{t('home.lab.title')}</h2>
            <p className={styles.paragraph}>{t('home.lab.text')}</p>
            <TextLink to={routes.contact}>{t('home.lab.cta')}</TextLink>
          </div>
        </div>

        <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
          <div className={styles.featureText}>
            <Eyebrow>{t('home.manufacturing.eyebrow')}</Eyebrow>
            <h2 className={styles.sectionTitle}>{t('home.manufacturing.title')}</h2>
            <p className={styles.paragraph}>{t('home.manufacturing.text1')}</p>
            <p className={styles.paragraph}>{t('home.manufacturing.text2')}</p>
          </div>
          <img
            src={PROVISIONAL_IMAGE}
            alt=""
            className={styles.featureImage}
            width={1200}
            height={800}
            loading="lazy"
          />
        </div>
      </Container>

      {/* Últimas noticias */}
      <section className={styles.cream}>
        <Container className={styles.newsBlock}>
          <div className={styles.newsHeader}>
            <h2 className={styles.sectionTitle}>{t('home.latestNews')}</h2>
            <TextLink to={routes.news}>{t('home.seeAllNews')}</TextLink>
          </div>
          <div className={styles.newsGrid}>
            {LATEST_NEWS.map((item) => (
              <NewsCard key={item.id} item={item} variant="compact" />
            ))}
          </div>
        </Container>
      </section>

      {/* Banda final */}
      <Container as="section" className={styles.ctaBlock}>
        <div className={styles.ctaBand}>
          <div className={styles.ctaText}>
            <h2 className={`${styles.sectionTitle} ${styles.ctaTitle}`}>{t('home.cta.title')}</h2>
            <p className={styles.ctaParagraph}>{t('home.cta.text')}</p>
          </div>
          <Button to={catalogueRequestPath} variant="light" size="lg">
            {t('common.requestCatalogue')}
          </Button>
        </div>
      </Container>
    </>
  );
};
