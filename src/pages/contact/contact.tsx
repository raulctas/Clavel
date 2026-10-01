import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { isContactReason } from 'constants/contact-reasons';
import {
  CONTACT_CATALOGUE_PARAM,
  CONTACT_PRODUCT_PARAM,
  CONTACT_REASON_PARAM,
} from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { isCatalogue, isProduct } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import { ContactForm } from './components/contact-form';
import styles from './contact.module.css';

export const Contact = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  usePageTitle(t('nav.contact'));

  // «Solicitar catálogo» llega con ?reason=catalogue para preseleccionar el motivo.
  const reasonParam = searchParams.get(CONTACT_REASON_PARAM);
  const initialReason = isContactReason(reasonParam) ? reasonParam : undefined;
  // Desde la ficha de un producto llega además ?product=<slug>: el producto sale
  // ya elegido. Un producto desconocido se ignora.
  const productParam = searchParams.get(CONTACT_PRODUCT_PARAM);
  const initialProduct = isProduct(productParam) ? productParam : undefined;
  // Desde la página de una gama llega ?catalogue=<gama>: ese catálogo sale ya
  // marcado. Una gama desconocida se ignora.
  const catalogueParam = searchParams.get(CONTACT_CATALOGUE_PARAM);
  const initialCatalogue = isCatalogue(catalogueParam) ? catalogueParam : undefined;

  return (
    <>
      <PageHeader
        page={t('nav.contact')}
        title={t('contact.title')}
        intro={t('contact.intro')}
        image={PAGE_HEADER_IMAGES.contact}
      />

      <Container as="section" className={styles.layout}>
        <div className={styles.formCard}>
          {/* La `key` reinicia el formulario si cambia lo pedido por URL. */}
          <ContactForm
            key={`${initialReason}-${initialProduct}-${initialCatalogue}`}
            initialReason={initialReason}
            initialProduct={initialProduct}
            initialCatalogue={initialCatalogue}
          />
        </div>
      </Container>
    </>
  );
};
