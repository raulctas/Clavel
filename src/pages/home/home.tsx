import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { CtaBand } from 'components/cta-band';
import { FeatureRow } from 'components/feature-row';
import { InfoCard } from 'components/info-card';
import { NewsCard } from 'components/news-card';
import { TextLink } from 'components/text-link';
import { adviceRequestPath, catalogueRequestPath, routes } from 'constants/routes';
import { NEWS } from 'data/news';
import { PILLARS } from 'data/pillars';
import { usePageTitle } from 'hooks/use-page-title';

import { HeroSlideshow } from './components/hero-slideshow';
import styles from './home.module.css';

const LATEST_NEWS = NEWS.slice(0, 3);
const LABORATORY_IMAGE = '/images/home/laboratory.jpg';
const MANUFACTURING_IMAGE = '/images/home/manufacturing.jpg';

export const Home = () => {
  const { t } = useTranslation();
  usePageTitle();

  return (
    <>
      <HeroSlideshow />

      {/* Pilares */}
      <section className={styles.cream}>
        <Container className={styles.pillarsBlock}>
          <h2 className={styles.sectionTitle}>{t('home.pillarsTitle')}</h2>
          <ul className={styles.pillars}>
            {/* Con ilustración, sin el icono (que sí se usa en «¿Por qué elegirnos?»). */}
            {PILLARS.map(({ key, image }) => (
              <InfoCard
                key={key}
                image={image}
                title={t(`pillars.${key}.title`)}
                text={t(`pillars.${key}.text`)}
              />
            ))}
          </ul>
        </Container>
      </section>

      {/* Laboratorio y Fabricación */}
      <Container as="section" className={styles.features}>
        <FeatureRow
          image={LABORATORY_IMAGE}
          eyebrow={t('home.lab.eyebrow')}
          title={t('home.lab.title')}
        >
          <p>{t('home.lab.text')}</p>
          <div className={styles.links}>
            <TextLink to={routes.laboratory}>{t('common.discoverMore')}</TextLink>
            <TextLink to={adviceRequestPath}>{t('home.lab.cta')}</TextLink>
          </div>
        </FeatureRow>

        <FeatureRow
          image={MANUFACTURING_IMAGE}
          eyebrow={t('home.manufacturing.eyebrow')}
          title={t('home.manufacturing.title')}
          reverse
        >
          <p>{t('home.manufacturing.text1')}</p>
          <p>{t('home.manufacturing.text2')}</p>
          <TextLink to={routes.production}>{t('common.discoverMore')}</TextLink>
        </FeatureRow>
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
      <CtaBand
        title={t('home.cta.title')}
        text={t('home.cta.text')}
        buttonLabel={t('common.requestCatalogue')}
        to={catalogueRequestPath}
      />
    </>
  );
};
