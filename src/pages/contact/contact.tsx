import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { isContactReason } from 'constants/contact-reasons';
import { CONTACT_PRODUCT_PARAM, CONTACT_REASON_PARAM } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { isCatalogue } from 'data/products';
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
  // Desde Productos y servicios llega además ?product=<clave>: su catálogo sale
  // ya marcado. Una clave desconocida se ignora.
  const productParam = searchParams.get(CONTACT_PRODUCT_PARAM);
  const initialCatalogue = isCatalogue(productParam) ? productParam : undefined;

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
              {contactDetails.map(({ key, icon: Icon, text, href, external }) => (
                <li key={key} className={styles.detail}>
                  <Icon size={20} className={styles.detailIcon} aria-hidden />
                  {href ? (
                    <a
                      href={href}
                      className={styles.detailLink}
                      {...(external && { target: '_blank', rel: 'noopener' })}
                    >
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
          {/* La `key` reinicia el formulario si cambia lo pedido por URL. */}
          <ContactForm
            key={`${initialReason}-${initialCatalogue}`}
            initialReason={initialReason}
            initialCatalogue={initialCatalogue}
          />
        </div>
      </Container>
    </>
  );
};
