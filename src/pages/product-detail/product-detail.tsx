import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { Breadcrumb } from 'components/breadcrumb';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { ProductCard } from 'components/product-card';
import { productInfoRequestPath, productRangePath, routes } from 'constants/routes';
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

  // La `key` reinicia la galería y el formato al pasar de un producto a otro.
  return found ? <ProductSheet key={found.slug} product={found} /> : <NotFound />;
};

/**
 * Ficha con la disposición de una tienda en línea: ruta arriba y tres columnas
 * (galería con miniaturas en vertical, información con «Detalles del producto»
 * desplegables y caja de contacto fija al hacer scroll). El formato elegido en
 * la caja y la miniatura de la galería van sincronizados.
 */
const ProductSheet = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const [format, setFormat] = useState(product.formats[0]);
  const range = findRange(product.range)!;
  const rangeTitle = t(`products.ranges.${range.key}.title`);
  const text = (key: string) => t(`products.items.${product.slug}.${key}`, { returnObjects: true });
  const description = text('description') as string[];
  const composition = text('composition') as string[];
  const productFunction = t(`products.items.${product.slug}.function`);
  const related = productsOfRange(range.key).filter((item) => item.slug !== product.slug);
  // Foto del formato elegido; si ese envase no tiene foto, la principal.
  const image = product.images.find((item) => item.format === format) ?? product.images[0];
  usePageTitle(product.name);

  return (
    <>
      <Container className={styles.top}>
        <Breadcrumb
          current={product.name}
          parent={[
            { label: t('products.title'), to: routes.products },
            { label: rangeTitle, to: productRangePath(range.key) },
          ]}
        />
      </Container>

      <Container as="section" className={styles.layout}>
        {/* ---------- Galería ---------- */}
        <div className={styles.gallery}>
          {product.images.length > 1 && (
            <div className={styles.thumbs}>
              {product.images.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className={[styles.thumb, item.src === image.src && styles.thumbActive]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={item.src === image.src}
                  aria-label={t('products.imageAlt', { name: product.name, format: item.format })}
                  onMouseEnter={() => setFormat(item.format)}
                  onClick={() => setFormat(item.format)}
                >
                  <img
                    src={item.src}
                    alt=""
                    className={styles.thumbImage}
                    width={80}
                    height={110}
                  />
                </button>
              ))}
            </div>
          )}
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
        </div>

        {/* ---------- Información ---------- */}
        <div className={styles.info}>
          <Link to={productRangePath(range.key)} className={styles.rangeLink}>
            {t('products.visitRange', { range: rangeTitle })}
          </Link>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.function}>{productFunction}</p>
          <ul className={styles.elements} aria-label={t('products.sheet.composition')}>
            {composition.map((item) => (
              <li key={item} className={styles.element}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Detalles (en móvil, debajo de la caja de contacto) ---------- */}
        <div className={styles.details}>
          <hr className={styles.rule} />

          <h2 className={styles.detailsTitle}>{t('products.detailsTitle')}</h2>
          <div className={styles.accordion}>
            <details className={styles.panel} open>
              <summary className={styles.summary}>
                {t('products.descriptionTitle')}
                <ChevronDown size={20} className={styles.chevron} aria-hidden />
              </summary>
              <div className={styles.description}>
                {description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>

            <details className={styles.panel} open>
              <summary className={styles.summary}>
                {t('products.sheet.title')}
                <ChevronDown size={20} className={styles.chevron} aria-hidden />
              </summary>
              <dl className={styles.rows}>
                <div className={styles.row}>
                  <dt>{t('products.sheet.range')}</dt>
                  <dd>{rangeTitle}</dd>
                </div>
                <div className={styles.row}>
                  <dt>{t('products.sheet.function')}</dt>
                  <dd>{productFunction}</dd>
                </div>
                <div className={styles.row}>
                  <dt>{t('products.sheet.state')}</dt>
                  <dd>{t(`products.states.${product.state}`)}</dd>
                </div>
                <div className={styles.row}>
                  <dt>{t('products.sheet.composition')}</dt>
                  <dd>{composition.join(' · ')}</dd>
                </div>
                <div className={styles.row}>
                  <dt>{t('products.sheet.formats')}</dt>
                  <dd>{product.formats.join(' · ')}</dd>
                </div>
              </dl>
            </details>
          </div>
        </div>

        {/* ---------- Caja de contacto ---------- */}
        <aside className={styles.box} aria-labelledby="product-request-title">
          <h2 id="product-request-title" className={styles.boxTitle}>
            {t('products.request.title', { name: product.name })}
          </h2>
          <p className={styles.boxText}>{t('products.request.text')}</p>

          <fieldset className={styles.formats}>
            <legend className={styles.formatsLabel}>{t('products.formatTitle')}</legend>
            <div className={styles.formatOptions}>
              {product.formats.map((item) => (
                <label
                  key={item}
                  className={[styles.formatOption, item === format && styles.formatActive]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <input
                    type="radio"
                    name="format"
                    value={item}
                    checked={item === format}
                    onChange={() => setFormat(item)}
                    className="visually-hidden"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <dl className={styles.boxRows}>
            <div>
              <dt>{t('products.sheet.range')}</dt>
              <dd>
                <Link to={productRangePath(range.key)} className={styles.boxLink}>
                  {rangeTitle}
                </Link>
              </dd>
            </div>
            <div>
              <dt>{t('products.sheet.state')}</dt>
              <dd>{t(`products.states.${product.state}`)}</dd>
            </div>
          </dl>

          <Button to={productInfoRequestPath(product.slug)} className={styles.boxButton}>
            {t('products.request.button')}
          </Button>
          <Button to={productRangePath(range.key)} variant="secondary" className={styles.boxButton}>
            {t('products.visitRange', { range: rangeTitle })}
            <ChevronRight size={18} aria-hidden />
          </Button>
        </aside>
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
