import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { COMPANY } from 'constants/company';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './privacy-policy.module.css';

/** Apartados de la política, en orden. Textos en privacyPolicy.sections.<apartado>. */
const SECTIONS = [
  'controller',
  'data',
  'purpose',
  'legalBasis',
  'retention',
  'recipients',
  'rights',
] as const;

/**
 * Política de privacidad, enlazada desde la casilla del formulario de contacto
 * y desde el pie. Los datos de la empresa se toman de `COMPANY` y de la
 * dirección traducida, para que no haya que repetirlos en los textos.
 */
export const PrivacyPolicy = () => {
  const { t } = useTranslation();
  usePageTitle(t('privacyPolicy.title'));

  const companyData = {
    company: COMPANY.name,
    address: t('contact.address'),
    email: COMPANY.email,
    phone: COMPANY.phone,
  };

  return (
    <>
      <PageHeader
        page={t('privacyPolicy.title')}
        title={t('privacyPolicy.title')}
        intro={t('privacyPolicy.intro')}
        image={PAGE_HEADER_IMAGES.privacyPolicy}
      />

      <Container as="section" className={styles.section}>
        <div className={styles.content}>
          <p className={styles.lead}>{t('privacyPolicy.lead')}</p>

          {SECTIONS.map((section) => (
            <div key={section} className={styles.block}>
              <h2 className={styles.title}>{t(`privacyPolicy.sections.${section}.title`)}</h2>
              <p className={styles.text}>
                {t(`privacyPolicy.sections.${section}.text`, companyData)}
              </p>
            </div>
          ))}

          <p className={styles.updated}>{t('privacyPolicy.updated')}</p>
        </div>
      </Container>
    </>
  );
};
