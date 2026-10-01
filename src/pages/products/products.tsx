import { CSSProperties, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { productRangePath } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { PRODUCT_RANGES, productsOfRange, RangeKey } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './products.module.css';

/** Radio del anillo, en % del lado del círculo (la gama se centra en ese punto). */
const RING_RADIUS = 38;

/**
 * Posición de cada gama sobre el anillo: repartidas a partes iguales,
 * empezando arriba y en el sentido de las agujas del reloj.
 */
const positionOf = (index: number): CSSProperties => {
  const angle = (-90 + (360 / PRODUCT_RANGES.length) * index) * (Math.PI / 180);
  return {
    left: `${50 + RING_RADIUS * Math.cos(angle)}%`,
    top: `${50 + RING_RADIUS * Math.sin(angle)}%`,
  };
};

/**
 * Productos: las cinco gamas colocadas en círculo alrededor de la flor de
 * Clavel. Al pasar el ratón por una gama (o al llegar con el teclado) el centro
 * muestra su descripción y su número de productos; al pulsarla se abre su
 * página. En móvil el círculo pasa a ser una lista con la descripción de cada
 * gama a la vista.
 */
export const Products = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<RangeKey>();
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
          <div className={styles.circle}>
            <div className={styles.ring} aria-hidden />

            {/* Centro: la flor y el lema o, si hay una gama activa, su descripción. */}
            <div className={styles.center} aria-hidden>
              {active ? (
                <div key={active} className={styles.centerContent}>
                  <span className={styles.centerTitle}>{t(`products.ranges.${active}.title`)}</span>
                  <span className={styles.centerText}>{t(`products.ranges.${active}.text`)}</span>
                  <span className={styles.centerCount}>
                    {t('products.productCount', { count: productsOfRange(active).length })}
                  </span>
                </div>
              ) : (
                <div className={styles.centerContent}>
                  <img
                    src="/images/logo/clavel-logo-color.png"
                    alt=""
                    className={styles.logo}
                    width={120}
                    height={120}
                  />
                  <span className={styles.centerHint}>{t('products.circleHint')}</span>
                </div>
              )}
            </div>

            <ul className={styles.ranges} onMouseLeave={() => setActive(undefined)}>
              {PRODUCT_RANGES.map((range, index) => (
                <li key={range.key} className={styles.item} style={positionOf(index)}>
                  <Link
                    to={productRangePath(range.key)}
                    className={[styles.range, active === range.key && styles.rangeActive]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseEnter={() => setActive(range.key)}
                    onFocus={() => setActive(range.key)}
                    onBlur={() => setActive(undefined)}
                  >
                    <img
                      src={range.image}
                      alt=""
                      className={styles.illustration}
                      width={480}
                      height={480}
                    />
                    <span className={styles.rangeText}>
                      <span className={styles.title}>
                        {t(`products.ranges.${range.key}.title`)}
                      </span>
                      {/*
                       * En el círculo la descripción se ve en el centro (y aquí solo la
                       * leen los lectores de pantalla); en móvil, aquí.
                       */}
                      <span className={styles.text}>{t(`products.ranges.${range.key}.text`)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
};
