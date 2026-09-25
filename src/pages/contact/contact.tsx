import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumb } from 'components/breadcrumb';
import { Container } from 'components/container';
import { isContactReason } from 'constants/contact-reasons';
import { CONTACT_REASON_PARAM } from 'constants/routes';
import { useContactDetails } from 'hooks/use-contact-details';
import { usePageTitle } from 'hooks/use-page-title';

import { ContactForm } from './components/contact-form';
import styles from './contact.module.css';

export const Contact = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const contactDetails = useContactDetails();
  usePageTitle(t('nav.contact'));

  // «Solicitar catálogo» llega con ?reason=catalogue para preseleccionar el motivo.
  const reasonParam = searchParams.get(CONTACT_REASON_PARAM);
  const initialReason = isContactReason(reasonParam) ? reasonParam : undefined;

  return (
    <div className={styles.page}>
      <Container as="section" className={styles.layout}>
        <div className={styles.intro}>
          <Breadcrumb current={t('nav.contact')} />
          <h1 className={styles.title}>{t('contact.title')}</h1>
          <p className={styles.lead}>{t('contact.intro')}</p>

          <div className={styles.detailsCard}>
            <h2 className={styles.detailsTitle}>{t('contact.detailsTitle')}</h2>
            <ul className={styles.details}>
              {contactDetails.map(({ key, icon: Icon, text, href }) => (
                <li key={key} className={styles.detail}>
                  <Icon size={20} className={styles.detailIcon} aria-hidden />
                  {href ? (
                    <a href={href} className={styles.detailLink}>
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.formCard}>
          {/* La `key` reinicia el formulario si cambia el motivo pedido por URL. */}
          <ContactForm key={initialReason} initialReason={initialReason} />
        </div>
      </Container>
    </div>
  );
};
