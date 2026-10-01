import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { ProductCard } from 'components/product-card';
import { productRangePath, routes } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { findRange, PRODUCT_RANGES, ProductRange as Range, productsOfRange } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';
import { NotFound } from 'pages/not-found';

import styles from './product-range.module.css';

/** Página de una gama: /products/<gama>. Una gama desconocida muestra la página 404. */
export const ProductRange = () => {
  const { range } = useParams();
  const found = findRange(range);

  return found ? <RangePage range={found} /> : <NotFound />;
};

const RangePage = ({ range }: { range: Range }) => {
  const { t } = useTranslation();
  const title = t(`products.ranges.${range.key}.title`);
  const number = String(range.number).padStart(2, '0');
  const products = productsOfRange(range.key);
  const otherRanges = PRODUCT_RANGES.filter((item) => item.key !== range.key);
  usePageTitle(title);

  return (
    <>
      <PageHeader
        page={title}
        parent={{ label: t('products.title'), to: routes.products }}
        eyebrow={t('products.rangeNumber', { number })}
        title={title}
        intro={t(`products.ranges.${range.key}.intro`)}
        image={PAGE_HEADER_IMAGES.products}
      />

      <section aria-labelledby="range-products-title">
        <Container className={styles.section}>
          <div className={styles.header}>
            <h2 id="range-products-title" className={styles.title}>
              {t('products.rangeProductsTitle')}
            </h2>
            <span className={styles.count}>
              {t('products.productCount', { count: products.length })}
            </span>
          </div>
          <ul className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ul>
        </Container>
      </section>

      {/* Navegación entre gamas: las otras cuatro, con su ilustración. */}
      <section className={styles.cream} aria-labelledby="other-ranges-title">
        <Container className={styles.section}>
          <h2 id="other-ranges-title" className={styles.title}>
            {t('products.otherRanges')}
          </h2>
          <ul className={styles.ranges}>
            {otherRanges.map((item) => (
              <li key={item.key}>
                <Link to={productRangePath(item.key)} className={`${styles.range} hover-lift`}>
                  <img
                    src={item.image}
                    alt=""
                    className={styles.rangeImage}
                    width={480}
                    height={480}
                  />
                  <span className={styles.rangeText}>
                    <span className={styles.rangeNumber}>
                      {t('products.rangeNumber', { number: String(item.number).padStart(2, '0') })}
                    </span>
                    <span className={styles.rangeTitle}>
                      {t(`products.ranges.${item.key}.title`)}
                    </span>
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
