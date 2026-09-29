import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Container } from 'components/container';
import { InfoCard } from 'components/info-card';
import { PageHeader } from 'components/page-header';
import { ProductTags } from 'components/product-tags';
import { routes } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { Brand, findBrand, PRODUCT_RANGES } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';
import { NotFound } from 'pages/not-found';

import styles from './product-brand.module.css';

/** Página de una marca: /products/<marca>. Una marca desconocida muestra la página 404. */
export const ProductBrand = () => {
  const { brand } = useParams();
  const found = findBrand(brand);

  return found ? <BrandPage brand={found} /> : <NotFound />;
};

const BrandPage = ({ brand }: { brand: Brand }) => {
  const { t } = useTranslation();
  const name = t(`products.brands.${brand.key}.name`);
  usePageTitle(`${t('products.title')} ${name}`);

  return (
    <>
      <PageHeader
        page={name}
        parent={{ label: t('products.title'), to: routes.products }}
        eyebrow={t(`products.brands.${brand.key}.line`)}
        title={name}
        intro={t(`products.brands.${brand.key}.text`)}
        image={PAGE_HEADER_IMAGES.products}
      />

      <section aria-labelledby="ranges-title">
        <Container className={styles.ranges}>
          <div className={styles.header}>
            <h2 id="ranges-title" className={styles.title}>
              {t('products.rangesTitle')}
            </h2>
            <ProductTags tags={brand.tags} />
          </div>
          <ul className={styles.grid}>
            {PRODUCT_RANGES.map((range) => (
              <InfoCard
                key={range.key}
                image={range.image}
                title={t(`products.ranges.${range.key}.title`)}
                text={t(`products.ranges.${range.key}.text`)}
              />
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};
