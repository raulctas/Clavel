import { useTranslation } from 'react-i18next';
import { BadgeCheck, Plane } from 'lucide-react';

import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';
import { InfoCard } from 'components/info-card';
import { PageHeader } from 'components/page-header';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { BRANDS, PRODUCT_RANGES, ProductTag } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './products.module.css';

const TAG_ICONS: Record<ProductTag, typeof BadgeCheck> = {
  certified: BadgeCheck,
  drone: Plane,
};

/**
 * Productos: las dos marcas de Clavel (Clavel y Agrentis), cada una con sus
 * cinco gamas. Las secciones alternan fondo blanco y crema.
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

      {BRANDS.map(({ key, tags }, index) => (
        <section
          key={key}
          className={index % 2 === 1 ? styles.cream : undefined}
          aria-labelledby={`brand-${key}`}
        >
          <Container className={styles.brand}>
            <div className={styles.brandHeader}>
              <Eyebrow>{t(`products.brands.${key}.line`)}</Eyebrow>
              <h2 id={`brand-${key}`} className={styles.brandName}>
                {t(`products.brands.${key}.name`)}
              </h2>
              <p className={styles.brandText}>{t(`products.brands.${key}.text`)}</p>
              <ul className={styles.tags}>
                {tags.map((tag) => {
                  const TagIcon = TAG_ICONS[tag];
                  return (
                    <li key={tag} className={styles.tag}>
                      <TagIcon size={16} aria-hidden />
                      {t(`products.tags.${tag}`)}
                    </li>
                  );
                })}
              </ul>
            </div>

            <h3 className={styles.rangesTitle}>{t('products.rangesTitle')}</h3>
            <ul
              className={[styles.ranges, index % 2 === 0 && styles.bordered]
                .filter(Boolean)
                .join(' ')}
            >
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
      ))}
    </>
  );
};
