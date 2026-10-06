import { useTranslation } from 'react-i18next';
import { Globe, Mail, Phone } from 'lucide-react';

import { toTelHref } from 'constants/company';
import { BusinessCard } from 'data/business-cards';

import styles from './card-mockup.module.css';

/** Logo de la tarjeta (el de la cabecera de la web). */
const LOGO_SRC = '/images/logo/clavel-logo-eco.webp';

/*
 * Onda verde de la tarjeta, medida sobre el diseño original (viewBox de
 * 2176 × 1408, el tamaño del PNG): la zona verde oscura, la banda verde clara
 * que se estrecha en los extremos y su línea blanca interior.
 */
const DARK_PATH =
  'M0 862 C43 859 163 843 260 844 C357 845 473 856 580 870 C687 884 793 908 900 931 C1007 954 1113 982 1220 1006 C1327 1030 1433 1060 1540 1076 C1647 1092 1775 1102 1860 1103 C1945 1104 1999 1090 2052 1081 C2105 1072 2155 1054 2176 1048 L2176 1408 L0 1408 Z';
const BAND_PATH =
  'M0 806 C33 801 121 785 196 778 C271 771 356 763 452 766 C548 769 665 782 772 798 C879 814 985 839 1092 863 C1199 887 1305 918 1412 943 C1519 968 1647 997 1732 1010 C1817 1023 1860 1020 1924 1021 C1988 1022 2074 1017 2116 1014 C2158 1011 2166 1004 2176 1002 L2176 1004 C2166 1007 2147 1015 2116 1022 C2085 1029 2041 1040 1988 1046 C1935 1052 1871 1060 1796 1057 C1721 1054 1636 1046 1540 1030 C1444 1014 1327 983 1220 959 C1113 935 1007 906 900 884 C793 862 687 838 580 824 C473 810 357 801 260 798 C163 795 43 806 0 808 Z';
const LINE_PATH =
  'M0 807 C33 804 121 790 196 787 C271 784 356 780 452 786 C548 792 665 806 772 824 C879 842 985 867 1092 891 C1199 915 1305 945 1412 968 C1519 991 1647 1016 1732 1027 C1817 1038 1860 1035 1924 1033 C1988 1031 2074 1022 2116 1017 C2158 1012 2166 1005 2176 1003';

/**
 * La tarjeta de presentación construida en la web, como el diseño impreso: el
 * nombre, el logo, la onda verde y los datos de contacto. Todo se dimensiona en
 * proporción al ancho de la tarjeta (unidades de contenedor), así que se ve
 * igual a cualquier tamaño. Teléfono, correo y web son enlaces.
 */
export const CardMockup = ({ card }: { card: BusinessCard }) => {
  const { t } = useTranslation();
  const contacts = [
    { key: 'phone', icon: Phone, text: card.phone, href: toTelHref(card.phone) },
    { key: 'email', icon: Mail, text: card.email, href: `mailto:${card.email}` },
    { key: 'web', icon: Globe, text: card.website, href: `https://${card.website}` },
  ];

  return (
    <article className={styles.card} aria-label={t('businessCard.alt', { name: card.name })}>
      <svg
        className={styles.wave}
        viewBox="0 0 2176 1408"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <path d={DARK_PATH} fill="#1a5c23" />
        <path d={BAND_PATH} fill="#3e7a4a" />
        <path d={LINE_PATH} fill="none" stroke="#ffffff" strokeWidth="4" />
      </svg>

      <h1 className={styles.name}>{card.name}</h1>
      <img src={LOGO_SRC} alt="Clavel Fertilizantes ECO" className={styles.logo} />

      <ul className={styles.contacts}>
        {contacts.map(({ key, icon: Icon, text, href }) => (
          <li key={key}>
            <a href={href} className={styles.contact}>
              <Icon className={styles.icon} aria-hidden />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};
