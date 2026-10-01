import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { ProductCard } from 'components/product-card';
import { catalogueRequestPath, productRangePath, routes } from 'constants/routes';
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
  const products = productsOfRange(range.key);
  const otherRanges = PRODUCT_RANGES.filter((item) => item.key !== range.key);
  usePageTitle(title);

  return (
    <>
      <PageHeader
        page={title}
        parent={{ label: t('products.title'), to: routes.products }}
        title={title}
        intro={t(`products.ranges.${range.key}.intro`)}
        image={PAGE_HEADER_IMAGES.products}
      />

      <section aria-labelledby="range-products-title">
        <Container className={styles.section}>
          <h2 id="range-products-title" className={styles.title}>
            {t('products.rangeProductsTitle')}
          </h2>
          <ul className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ul>
          {/* Abre Contactar con «Solicitar catálogo» y el de esta gama ya marcados. */}
          <div>
            <Button to={catalogueRequestPath(range.key)} size="lg">
              <FileText size={20} aria-hidden />
              {t('products.requestCatalogue', { range: title })}
            </Button>
          </div>
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
                  <span className={styles.rangeTitle}>
                    {t(`products.ranges.${item.key}.title`)}
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
