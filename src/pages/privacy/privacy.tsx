import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { RichText } from 'components/rich-text';
import { COMPANY } from 'constants/company';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './privacy.module.css';

/** Apartados de la política, en orden. Textos en privacy.sections.<apartado>. */
const SECTIONS = [
  'introduction',
  'controller',
  'data',
  'purpose',
  'legalBasis',
  'retention',
  'recipients',
  'rights',
  'security',
  'thirdParties',
  'cookies',
  'intellectualProperty',
  'userObligations',
  'law',
  'updates',
] as const;

/**
 * Política de privacidad y condiciones de uso: /privacy. Enlazada desde la
 * casilla del formulario de contacto y desde el pie. Los datos de la empresa
 * se toman de `COMPANY` y de la dirección traducida, para no repetirlos en los
 * textos.
 */
export const Privacy = () => {
  const { t } = useTranslation();
  usePageTitle(t('privacy.title'));

  const companyData = {
    company: COMPANY.name,
    address: t('contact.address'),
    email: COMPANY.email,
    phone: COMPANY.phone,
  };

  return (
    <>
      <PageHeader
        page={t('privacy.title')}
        title={t('privacy.title')}
        intro={t('privacy.intro')}
        image={PAGE_HEADER_IMAGES.privacy}
      />

      <Container as="section" className={styles.section}>
        <div className={styles.layout}>
          <nav className={styles.index} aria-labelledby="privacy-index-title">
            <p className={styles.updated}>{t('privacy.updated')}</p>
            <h2 id="privacy-index-title" className={styles.indexTitle}>
              {t('privacy.indexTitle')}
            </h2>
            <ol className={styles.indexList}>
              {SECTIONS.map((section) => (
                <li key={section}>
                  <a href={`#${section}`} className={styles.indexLink}>
                    {t(`privacy.sections.${section}.title`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.content}>
            {SECTIONS.map((section, index) => (
              <section key={section} id={section} className={styles.block}>
                <h2 className={styles.title}>
                  <span className={styles.number}>{index + 1}.</span>
                  {t(`privacy.sections.${section}.title`)}
                </h2>
                <RichText
                  blocks={
                    t(`privacy.sections.${section}.body`, {
                      ...companyData,
                      returnObjects: true,
                    }) as string[]
                  }
                />
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};
