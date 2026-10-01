import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { COMPANY } from 'constants/company';
import { productPath } from 'constants/routes';
import { Product } from 'data/products';

import styles from './product-card.module.css';

interface Props {
  product: Product;
  /** Añade la gama junto a la marca («Clavel · Terra»), para listas de varias gamas. */
  showRange?: boolean;
}

/**
 * Tarjeta de un producto (página de la gama, «Todos los productos» y «Otros
 * productos» de la ficha):
 * foto del envase principal, marca, nombre, función y composición. Toda la tarjeta
 * enlaza con la ficha técnica.
 */
export const ProductCard = ({ product, showRange }: Props) => {
  const { t } = useTranslation();
  const composition = t(`products.items.${product.slug}.composition`, {
    returnObjects: true,
  }) as string[];

  return (
    <li>
      <Link to={productPath(product.range, product.slug)} className={`${styles.card} hover-lift`}>
        <div className={styles.imageBox}>
          <img
            src={product.images[0].src}
            alt=""
            className={styles.image}
            width={300}
            height={900}
            loading="lazy"
          />
        </div>
        <div className={styles.body}>
          <p className={styles.brand}>
            {COMPANY.name}
            {showRange && ` · ${t(`products.ranges.${product.range}.title`)}`}
          </p>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.function}>{t(`products.items.${product.slug}.function`)}</p>
          <ul className={styles.composition} aria-label={t('products.sheet.composition')}>
            {composition.map((item) => (
              <li key={item} className={styles.element}>
                {item}
              </li>
            ))}
          </ul>
          <span className={styles.more}>
            {t('products.viewSheet')}
            <ArrowRight size={18} aria-hidden />
          </span>
        </div>
      </Link>
    </li>
  );
};
