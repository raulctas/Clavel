import { useTranslation } from 'react-i18next';
import { LucideIcon, Mail, MapPin, Phone, Smartphone } from 'lucide-react';

import { COMPANY, COMPANY_MAPS_URL, toTelHref } from 'constants/company';

export interface ContactDetail {
  key: string;
  icon: LucideIcon;
  text: string;
  href?: string;
  /** Abre en otra pestaña (p. ej. Google Maps). */
  external?: boolean;
}

/** Datos que, por el momento, se muestran solo con su icono, sin texto. */
const DETAILS_WITHOUT_TEXT = ['address', 'phone'];
/** Datos que, por el momento, no se muestran. */
const HIDDEN_DETAILS = ['mobile'];

const withoutText = (detail: ContactDetail): ContactDetail =>
  DETAILS_WITHOUT_TEXT.includes(detail.key) ? { ...detail, text: '', href: undefined } : detail;

/** Dirección, teléfonos y correo de Clavel (pie y página de Contactar). */
export const useContactDetails = (): ContactDetail[] => {
  const { t } = useTranslation();

  const details: ContactDetail[] = [
    {
      key: 'address',
      icon: MapPin,
      text: t('contact.address'),
      href: COMPANY_MAPS_URL,
      external: true,
    },
    { key: 'phone', icon: Phone, text: COMPANY.phone, href: toTelHref(COMPANY.phone) },
    { key: 'mobile', icon: Smartphone, text: COMPANY.mobile, href: toTelHref(COMPANY.mobile) },
    { key: 'email', icon: Mail, text: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ];

  return details.filter(({ key }) => !HIDDEN_DETAILS.includes(key)).map(withoutText);
};
