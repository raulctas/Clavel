import { useTranslation } from 'react-i18next';
import { BadgeCheck, Plane } from 'lucide-react';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { CtaBand } from 'components/cta-band';
import { IconCircle } from 'components/icon-circle';
import { InfoCard } from 'components/info-card';
import { PageHeader } from 'components/page-header';
import { catalogueRequestPath, productCatalogueRequestPath } from 'constants/routes';
import { PAGE_HEADER_IMAGES } from 'data/page-header-images';
import { MAIN_LINES, OTHER_SOLUTIONS, PRODUCT_RANGES, ProductTag } from 'data/products';
import { usePageTitle } from 'hooks/use-page-title';

import styles from './products-services.module.css';

const TAG_ICONS: Record<ProductTag, typeof BadgeCheck> = {
  certified: BadgeCheck,
  drone: Plane,
};

/**
 * Productos y servicios: información sencilla de cada línea, cada una con su
 * botón para pedir el catálogo desde Contactar (con el producto ya indicado).
 */
export const ProductsServices = () => {
  const { t } = useTranslation();
  usePageTitle(t('productsServices.title'));

  return (
    <>
      <PageHeader
        page={t('productsServices.title')}
        title={t('productsServices.title')}
        intro={t('productsServices.intro')}
        image={PAGE_HEADER_IMAGES.productsServices}
      />

      {/* Líneas principales */}
      <Container as="section" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('productsServices.mainTitle')}</h2>
          <p className={styles.sectionIntro}>{t('productsServices.mainIntro')}</p>
        </div>
        <ul className={styles.lines}>
          {MAIN_LINES.map(({ key, icon, tags }) => (
            <li key={key} className={`${styles.line} hover-lift`}>
              <IconCircle icon={icon} />
              <h3 className={styles.lineTitle}>{t(`productsServices.lines.${key}.title`)}</h3>
              <p className={styles.lineText}>{t(`productsServices.lines.${key}.text`)}</p>
              {tags && (
                <ul className={styles.tags}>
                  {tags.map((tag) => {
                    const TagIcon = TAG_ICONS[tag];
                    return (
                      <li key={tag} className={styles.tag}>
                        <TagIcon size={16} aria-hidden />
                        {t(`productsServices.tags.${tag}`)}
                      </li>
                    );
                  })}
                </ul>
              )}
              <Button to={productCatalogueRequestPath(key)} className={styles.lineButton}>
                {t('common.requestCatalogue')}
              </Button>
            </li>
          ))}
        </ul>
      </Container>

      {/* Gamas de producto */}
      <section className={styles.cream}>
        <Container className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('productsServices.rangesTitle')}</h2>
            <p className={styles.sectionIntro}>{t('productsServices.rangesIntro')}</p>
          </div>
          <ul className={styles.grid}>
            {PRODUCT_RANGES.map(({ key, icon }) => (
              <InfoCard
                key={key}
                icon={icon}
                title={t(`productsServices.ranges.${key}.title`)}
                text={t(`productsServices.ranges.${key}.text`)}
              />
            ))}
          </ul>
        </Container>
      </section>

      {/* Otras soluciones */}
      <Container as="section" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('productsServices.otherTitle')}</h2>
          <p className={styles.sectionIntro}>{t('productsServices.otherIntro')}</p>
        </div>
        <ul className={`${styles.grid} ${styles.bordered}`}>
          {OTHER_SOLUTIONS.map(({ key, icon }) => (
            <InfoCard
              key={key}
              icon={icon}
              title={t(`productsServices.other.${key}.title`)}
              text={t(`productsServices.other.${key}.text`)}
            >
              <Button to={productCatalogueRequestPath(key)} variant="secondary" size="sm">
                {t('common.requestCatalogue')}
              </Button>
            </InfoCard>
          ))}
        </ul>
      </Container>

      <CtaBand
        title={t('productsServices.cta.title')}
        text={t('productsServices.cta.text')}
        buttonLabel={t('common.requestCatalogue')}
        to={catalogueRequestPath}
      />
    </>
  );
};
