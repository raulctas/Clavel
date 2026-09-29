import { useTranslation } from 'react-i18next';
import { ClipboardCheck, Factory, PackageSearch, Truck } from 'lucide-react';

import { Container } from 'components/container';
import { FeatureRow } from 'components/feature-row';
import { IconCircle } from 'components/icon-circle';
import { PageHeader } from 'components/page-header';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { usePageTitle } from 'hooks/use-page-title';
import { Feature } from 'interfaces/feature';

import styles from './production.module.css';

/** Pasos del proceso, en orden. Textos en production.steps.<key>. */
const STEPS: Feature[] = [
  { key: 'rawMaterials', icon: PackageSearch },
  { key: 'manufacturing', icon: Factory },
  { key: 'qualityControl', icon: ClipboardCheck },
  { key: 'delivery', icon: Truck },
];

/** Proceso de producción y logística: /production-logistics (desde Inicio). */
export const Production = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.production'));

  return (
    <>
      <PageHeader
        page={t('nav.production')}
        title={t('production.title')}
        intro={t('production.intro')}
        image={PAGE_HEADER_IMAGES.production}
      />

      <Container as="section" className={styles.features}>
        <FeatureRow
          image="/images/production/manufacturing.jpg"
          eyebrow={t('production.manufacturing.eyebrow')}
          title={t('production.manufacturing.title')}
        >
          <p>{t('production.manufacturing.text')}</p>
        </FeatureRow>
        <FeatureRow
          image="/images/production/logistics.jpg"
          eyebrow={t('production.logistics.eyebrow')}
          title={t('production.logistics.title')}
          reverse
        >
          <p>{t('production.logistics.text')}</p>
        </FeatureRow>
      </Container>

      <section className={styles.cream}>
        <Container className={styles.stepsBlock}>
          <h2 className={styles.sectionTitle}>{t('production.stepsTitle')}</h2>
          <ol className={styles.steps}>
            {STEPS.map(({ key, icon }, index) => (
              <li key={key} className={`${styles.step} hover-lift`}>
                <div className={styles.stepHeader}>
                  <IconCircle icon={icon} />
                  <span className={styles.stepNumber} aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className={styles.stepTitle}>{t(`production.steps.${key}.title`)}</h3>
                <p className={styles.stepText}>{t(`production.steps.${key}.text`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
};
