import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { COMPANY_STATS } from 'data/company-stats';
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
 * Cifras de la empresa, que cuentan hacia arriba al aparecer. Van al final de
 * «¿Por qué elegirnos?» (Quiénes somos), como datos que respaldan los motivos.
 */
export const CompanyStats = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.stats} aria-label={t('aboutUs.stats.title')}>
      {COMPANY_STATS.map(({ key, value }) => (
        <Stat key={key} value={value} label={t(`aboutUs.stats.items.${key}`)} />
      ))}
    </ul>
  );
};
