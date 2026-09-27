import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { COMPANY_STATS, COMPANY_STATS_IMAGES } from 'data/company-stats';
import { useCountUp } from 'hooks/use-count-up';

import styles from './company-stats.module.css';

/**
 * Formatea con separador de miles siempre, también con cuatro cifras: en
 * español, por defecto, 1100 no se agrupa y queremos «1.100» (y «1,100» en
 * inglés). `useGrouping: 'always'` es de ES2023 y los tipos de TypeScript de
 * este proyecto (ES2020) aún no lo recogen, de ahí la conversión.
 */
const formatNumber = (value: number, language: string) =>
  new Intl.NumberFormat(language, {
    useGrouping: 'always',
  } as unknown as Intl.NumberFormatOptions).format(value);

interface StatProps {
  value: number;
  label: string;
}

const Stat = ({ value, label }: StatProps) => {
  const { i18n } = useTranslation();
  const ref = useRef<HTMLParagraphElement>(null);
  const current = useCountUp(value, ref);

  return (
    <li className={styles.stat}>
      {/* La cifra final va en el texto accesible: la animación es solo visual. */}
      <p ref={ref} className={styles.value} aria-hidden>
        {formatNumber(current, i18n.language)}
      </p>
      <p className={styles.label}>
        <span className="visually-hidden">{formatNumber(value, i18n.language)} </span>
        {label}
      </p>
    </li>
  );
};

/**
 * Cierre de Quiénes somos, sobre crema: dos imágenes y las cifras de la
 * empresa, que cuentan hacia arriba al aparecer.
 */
export const CompanyStats = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section} aria-labelledby="company-stats-title">
      <h2 id="company-stats-title" className="visually-hidden">
        {t('aboutUs.stats.title')}
      </h2>
      <Container className={styles.images}>
        {COMPANY_STATS_IMAGES.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            className={styles.image}
            width={1200}
            height={800}
            loading="lazy"
          />
        ))}
      </Container>
      <Container>
        <ul className={styles.stats}>
          {COMPANY_STATS.map(({ key, value }) => (
            <Stat key={key} value={value} label={t(`aboutUs.stats.items.${key}`)} />
          ))}
        </ul>
      </Container>
    </section>
  );
};
