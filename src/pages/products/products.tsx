import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';
import { PageHeader } from 'components/page-header';
import { ProductTags } from 'components/product-tags';
import { productPath, productRangePath } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { PRODUCT_RANGES, PRODUCT_TAGS, productsOfRange } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './products.module.css';

/**
 * Productos: las cinco gamas, una banda grande por gama. Cada banda lleva el
 * número de la gama, su ilustración, su descripción y la lista de sus
 * productos, que enlazan directamente con su ficha. Las bandas alternan fondo
 * y lado de la ilustración.
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

      <Container className={styles.tags}>
        <ProductTags tags={PRODUCT_TAGS} />
      </Container>

      {PRODUCT_RANGES.map((range, index) => {
        const products = productsOfRange(range.key);
        const number = String(range.number).padStart(2, '0');
        const titleId = `range-${range.key}`;
        return (
          <section
            key={range.key}
            className={index % 2 === 0 ? styles.cream : undefined}
            aria-labelledby={titleId}
          >
            <Container
              className={[styles.range, index % 2 === 1 && styles.reverse]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.visual} aria-hidden>
                <span className={styles.number}>{number}</span>
                <img
                  src={range.image}
                  alt=""
                  className={styles.illustration}
                  width={480}
                  height={480}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>

              <div className={styles.content}>
                <Eyebrow>{t('products.productCount', { count: products.length })}</Eyebrow>
                <h2 id={titleId} className={styles.title}>
                  <Link to={productRangePath(range.key)} className={styles.titleLink}>
                    {t(`products.ranges.${range.key}.title`)}
                  </Link>
                </h2>
                <p className={styles.intro}>{t(`products.ranges.${range.key}.intro`)}</p>

                <ul className={styles.products}>
                  {products.map((product) => (
                    <li key={product.slug}>
                      <Link to={productPath(range.key, product.slug)} className={styles.product}>
                        <span className={styles.productText}>
                          <span className={styles.productName}>{product.name}</span>
                          <span className={styles.productFunction}>
                            {t(`products.items.${product.slug}.function`)}
                          </span>
                        </span>
                        <ArrowRight size={18} className={styles.productArrow} aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Button to={productRangePath(range.key)} variant="secondary" className={styles.cta}>
                  {t('products.viewRange')}
                </Button>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
};
