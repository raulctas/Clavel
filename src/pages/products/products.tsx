import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { productRangePath, routes } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { PRODUCT_RANGES } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './products.module.css';

/**
 * Productos: las cinco gamas en una rejilla centrada (tres arriba y dos abajo
 * en escritorio), cada una en una tarjeta con su ilustración, su título y su
 * descripción breve. Toda la tarjeta enlaza con la página de la gama, donde
 * están sus productos; el borde y la elevación al pasar el ratón indican que se
 * puede pulsar. Debajo, «Ver todos los productos» lleva a la lista completa.
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
          <ul className={styles.ranges}>
            {PRODUCT_RANGES.map((range) => (
              <li key={range.key} className={styles.item}>
                <Link to={productRangePath(range.key)} className={`${styles.range} hover-lift`}>
                  <img
                    src={range.image}
                    alt=""
                    className={styles.illustration}
                    width={480}
                    height={480}
                  />
                  <h2 className={styles.title}>{t(`products.ranges.${range.key}.title`)}</h2>
                  <p className={styles.text}>{t(`products.ranges.${range.key}.text`)}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.viewAll}>
            <Button to={routes.allProducts} size="lg">
              {t('products.viewAll')}
              <ArrowRight size={20} aria-hidden />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};
