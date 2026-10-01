import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { ProductCard } from 'components/product-card';
import { routes } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { PRODUCTS } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './all-products.module.css';

/**
 * Todos los productos: /products/all. Los de las cinco gamas juntos, en una
 * sola rejilla y en el orden de las gamas. Cada tarjeta indica su gama y
 * enlaza con la ficha técnica.
 */
export const AllProducts = () => {
  const { t } = useTranslation();
  const title = t('products.all.title');
  usePageTitle(title);

  return (
    <>
      <PageHeader
        page={title}
        parent={{ label: t('products.title'), to: routes.products }}
        title={title}
        intro={t('products.all.intro')}
        image={PAGE_HEADER_IMAGES.products}
      />

      <section aria-label={title}>
        <Container className={styles.section}>
          <ul className={styles.grid}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} showRange />
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};
