import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { ProductCard } from 'components/product-card';
import { productInfoRequestPath, productRangePath, routes } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { findProduct, findRange, Product, productsOfRange } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';
import { NotFound } from 'pages/not-found';

import styles from './product-detail.module.css';

/**
 * Ficha de un producto: /products/<gama>/<producto>. Si el producto no existe
 * o no es de esa gama, muestra la página 404.
 */
export const ProductDetail = () => {
  const { range, product } = useParams();
  const found = findProduct(range, product);

  return found ? <ProductSheet product={found} /> : <NotFound />;
};

const ProductSheet = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const [imageIndex, setImageIndex] = useState(0);
  const range = findRange(product.range)!;
  const rangeTitle = t(`products.ranges.${range.key}.title`);
  const text = (key: string) => t(`products.items.${product.slug}.${key}`, { returnObjects: true });
  const description = text('description') as string[];
  const composition = text('composition') as string[];
  const related = productsOfRange(range.key).filter((item) => item.slug !== product.slug);
  const image = product.images[imageIndex] ?? product.images[0];
  usePageTitle(product.name);

  return (
    <>
      <PageHeader
        page={product.name}
        parent={[
          { label: t('products.title'), to: routes.products },
          { label: rangeTitle, to: productRangePath(range.key) },
        ]}
        eyebrow={rangeTitle}
        title={product.name}
        intro={t(`products.items.${product.slug}.function`)}
        image={PAGE_HEADER_IMAGES.products}
      />

      <Container as="section" className={styles.layout}>
        {/* Galería: foto grande y miniaturas de los envases. */}
        <div className={styles.gallery}>
          <div className={styles.stage}>
            <img
              key={image.src}
              src={image.src}
              alt={t('products.imageAlt', { name: product.name, format: image.format })}
              className={styles.stageImage}
              width={600}
              height={900}
            />
          </div>
          {product.images.length > 1 && (
            <div className={styles.thumbs}>
              {product.images.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  className={[styles.thumb, index === imageIndex && styles.thumbActive]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={index === imageIndex}
                  aria-label={t('products.imageAlt', { name: product.name, format: item.format })}
                  onClick={() => setImageIndex(index)}
                >
                  <img
                    src={item.src}
                    alt=""
                    className={styles.thumbImage}
                    width={120}
                    height={160}
                  />
                  <span className={styles.thumbLabel}>{item.format}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles.description}>
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section className={styles.sheet} aria-labelledby="product-sheet-title">
            <h2 id="product-sheet-title" className={styles.sheetTitle}>
              {t('products.sheet.title')}
            </h2>
            <dl className={styles.rows}>
              <div className={styles.row}>
                <dt>{t('products.sheet.range')}</dt>
                <dd>{rangeTitle}</dd>
              </div>
              <div className={styles.row}>
                <dt>{t('products.sheet.function')}</dt>
                <dd>{t(`products.items.${product.slug}.function`)}</dd>
              </div>
              <div className={styles.row}>
                <dt>{t('products.sheet.state')}</dt>
                <dd>{t(`products.states.${product.state}`)}</dd>
              </div>
              <div className={styles.row}>
                <dt>{t('products.sheet.composition')}</dt>
                <dd>
                  <ul className={styles.elements}>
                    {composition.map((item) => (
                      <li key={item} className={styles.element}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className={styles.row}>
                <dt>{t('products.sheet.formats')}</dt>
                <dd>{product.formats.join(' · ')}</dd>
              </div>
            </dl>
          </section>

          {/* Contacto con el producto ya elegido en el formulario. */}
          <div className={styles.request}>
            <MessageSquareText size={28} className={styles.requestIcon} aria-hidden />
            <div className={styles.requestText}>
              <h2 className={styles.requestTitle}>
                {t('products.request.title', { name: product.name })}
              </h2>
              <p>{t('products.request.text')}</p>
            </div>
            <Button to={productInfoRequestPath(product.slug)} className={styles.requestButton}>
              {t('products.request.button')}
            </Button>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section className={styles.cream} aria-labelledby="related-title">
          <Container className={styles.related}>
            <h2 id="related-title" className={styles.relatedTitle}>
              {t('products.relatedTitle', { range: rangeTitle })}
            </h2>
            <ul className={styles.relatedGrid}>
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
};
