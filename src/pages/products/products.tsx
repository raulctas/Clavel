import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';
import { PageHeader } from 'components/page-header';
import { ProductTags } from 'components/product-tags';
import { productBrandPath } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { BRANDS } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './products.module.css';

/**
 * Productos: solo las dos marcas de Clavel (Clavel y Agrentis), en tarjetas
 * grandes. Cada tarjeta lleva a la página de la marca, con sus cinco gamas.
 */
export const Products = () => {
  const { t } = useTranslation();
  usePageTitle(t('products.title'));

  return (
    <>
      <PageHeader
        page={t('products.title')}
        title={t('products.title')}
        intro={t('products.intro')}
        image={PAGE_HEADER_IMAGES.products}
      />

      <section aria-label={t('products.title')}>
        <Container className={styles.section}>
          <ul className={styles.brands}>
            {BRANDS.map(({ key, tags }) => (
              <li key={key}>
                {/* Toda la tarjeta es el enlace a la página de la marca. */}
                <Link to={productBrandPath(key)} className={`${styles.brand} hover-lift`}>
                  <Eyebrow>{t(`products.brands.${key}.line`)}</Eyebrow>
                  <h2 className={styles.brandName}>{t(`products.brands.${key}.name`)}</h2>
                  <p className={styles.brandText}>{t(`products.brands.${key}.text`)}</p>
                  <ProductTags tags={tags} />
                  <span className={styles.more}>
                    {t('products.viewRanges')}
                    <ArrowRight size={18} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};
