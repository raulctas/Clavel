import { useTranslation } from 'react-i18next';
import { BadgeCheck, LucideIcon, Plane } from 'lucide-react';

import { ProductTag } from 'data/products';

import styles from './product-tags.module.css';

const TAG_ICONS: Record<ProductTag, LucideIcon> = {
  certified: BadgeCheck,
  drone: Plane,
};

interface Props {
  tags: ProductTag[];
}

/** Etiquetas de una marca (certificado ecológico, compatible con dron…). */
export const ProductTags = ({ tags }: Props) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => {
        const Icon = TAG_ICONS[tag];
        return (
          <li key={tag} className={styles.tag}>
            <Icon size={16} aria-hidden />
            {t(`products.tags.${tag}`)}
          </li>
        );
      })}
    </ul>
  );
};
