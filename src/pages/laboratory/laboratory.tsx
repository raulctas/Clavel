import { useTranslation } from 'react-i18next';
import { FlaskConical, Microscope, ScrollText } from 'lucide-react';

import { Container } from 'components/container';
import { CtaBand } from 'components/cta-band';
import { FeatureRow } from 'components/feature-row';
import { InfoCard } from 'components/info-card';
import { PageHeader } from 'components/page-header';
import { adviceRequestPath } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { usePageTitle } from 'hooks/use-page-title';
import { Feature } from 'interfaces/feature';

import styles from './laboratory.module.css';

/** Lo que se hace en el laboratorio. Textos en laboratory.pillars.<key>. */
const LAB_PILLARS: Feature[] = [
  { key: 'research', icon: FlaskConical },
  { key: 'compliance', icon: ScrollText },
  { key: 'quality', icon: Microscope },
];

/** Laboratorio de innovación y control de calidad: /laboratory (desde Inicio). */
export const Laboratory = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.laboratory'));

  return (
    <>
      <PageHeader
        page={t('nav.laboratory')}
        title={t('laboratory.title')}
        intro={t('laboratory.intro')}
        image={PAGE_HEADER_IMAGES.laboratory}
      />

      <Container as="section" className={styles.overview}>
        <FeatureRow
          image="/images/provisional/news-3x2.png"
          eyebrow={t('laboratory.overview.eyebrow')}
          title={t('laboratory.overview.title')}
        >
          <p>{t('laboratory.overview.text1')}</p>
          <p>{t('laboratory.overview.text2')}</p>
        </FeatureRow>
      </Container>

      <section className={styles.cream}>
        <Container className={styles.pillarsBlock}>
          <h2 className={styles.sectionTitle}>{t('laboratory.pillarsTitle')}</h2>
          <ul className={styles.pillars}>
            {LAB_PILLARS.map(({ key, icon }) => (
              <InfoCard
                key={key}
                icon={icon}
                title={t(`laboratory.pillars.${key}.title`)}
                text={t(`laboratory.pillars.${key}.text`)}
              />
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={t('laboratory.cta.title')}
        text={t('laboratory.cta.text')}
        buttonLabel={t('laboratory.cta.button')}
        to={adviceRequestPath}
      />
    </>
  );
};
