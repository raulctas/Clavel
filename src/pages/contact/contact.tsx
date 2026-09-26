import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Clock } from 'lucide-react';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { isContactReason } from 'constants/contact-reasons';
import { CONTACT_PRODUCT_PARAM, CONTACT_REASON_PARAM } from 'constants/routes';
import { OPENING_HOURS } from 'data/opening-hours';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { productTitleKey } from 'data/products';
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
  // Desde Productos y servicios llega además ?product=<clave>: el mensaje se
  // rellena con el producto. Una clave desconocida se ignora.
  const productKey = productTitleKey(searchParams.get(CONTACT_PRODUCT_PARAM));
  const initialMessage = productKey
    ? t('contact.form.productInterest', { product: t(productKey) })
    : undefined;

  return (
    <>
      <PageHeader
        page={t('nav.contact')}
        title={t('contact.title')}
        intro={t('contact.intro')}
        image={PAGE_HEADER_IMAGES.contact}
      />

      <Container as="section" className={styles.layout}>
        <div className={styles.info}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t('contact.detailsTitle')}</h2>
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

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Clock size={20} className={styles.detailIcon} aria-hidden />
              {t('contact.hours.title')}
            </h2>
            <dl className={styles.hours}>
              {OPENING_HOURS.map(({ day, open, close }) => (
                <div key={day} className={styles.hoursRow}>
                  <dt className={styles.hoursDay}>{t(`contact.hours.days.${day}`)}</dt>
                  <dd className={styles.hoursRange}>{t('contact.hours.range', { open, close })}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={styles.formCard}>
          {/* La `key` reinicia el formulario si cambia lo pedido por URL. */}
          <ContactForm
            key={`${initialReason}-${productKey}`}
            initialReason={initialReason}
            initialMessage={initialMessage}
          />
        </div>
      </Container>
    </>
  );
};
