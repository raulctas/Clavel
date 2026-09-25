import { useTranslation } from 'react-i18next';
import { BadgeCheck } from 'lucide-react';

import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';
import { IconCircle } from 'components/icon-circle';
import { PageHeader } from 'components/page-header';
import { ABOUT_BLOCKS } from 'data/about-blocks';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { PILLARS } from 'data/pillars';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './about-us.module.css';

export const AboutUs = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.aboutUs'));

  return (
    <>
      <PageHeader
        page={t('nav.aboutUs')}
        title={t('aboutUs.title')}
        intro={t('aboutUs.intro')}
        image={PAGE_HEADER_IMAGES.aboutUs}
        spacious
      />

      {/* Misión, objetivos y propósito */}
      <Container as="section" className={styles.blocksSection}>
        <ul className={styles.blocks}>
          {ABOUT_BLOCKS.map(({ key, icon }) => (
            <li key={key} className={styles.block}>
              <IconCircle icon={icon} />
              <h2 className={styles.blockTitle}>{t(`aboutUs.blocks.${key}.title`)}</h2>
              <p className={styles.blockText}>{t(`aboutUs.blocks.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* ¿Por qué elegirnos? */}
      <section className={styles.cream}>
        <Container className={styles.whySection}>
          <div className={styles.whyHeader}>
            <h2 className={styles.sectionTitle}>{t('aboutUs.whyTitle')}</h2>
            <p className={styles.whyIntro}>{t('aboutUs.whyIntro')}</p>
          </div>
          <ul className={styles.reasons}>
            {PILLARS.map(({ key, icon: Icon }) => (
              <li key={key} className={styles.reason}>
                <Icon size={24} className={styles.reasonIcon} aria-hidden />
                <div className={styles.reasonBody}>
                  <h3 className={styles.reasonTitle}>{t(`pillars.${key}.title`)}</h3>
                  <p className={styles.reasonText}>{t(`pillars.${key}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Calidad ecológica certificada */}
      <Container as="section" className={styles.quality}>
        <img
          src="/images/provisional/section-1x1.png"
          alt=""
          className={styles.qualityImage}
          width={1000}
          height={1000}
          loading="lazy"
        />
        <div className={styles.qualityText}>
          <Eyebrow>{t('aboutUs.quality.eyebrow')}</Eyebrow>
          <h2 className={styles.sectionTitle}>{t('aboutUs.quality.title')}</h2>
          <p className={styles.paragraph}>{t('aboutUs.quality.text')}</p>
          <p className={styles.certificate}>
            <BadgeCheck size={18} aria-hidden />
            {t('aboutUs.quality.certificate')}
          </p>
          <hr className={styles.divider} />
          <h3 className={styles.organicTitle}>{t('aboutUs.organic.title')}</h3>
          <p className={styles.paragraph}>{t('aboutUs.organic.text')}</p>
        </div>
      </Container>
    </>
  );
};
