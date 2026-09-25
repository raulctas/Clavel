import { useTranslation } from 'react-i18next';
import { LucideIcon, Mail, MapPin, Phone, Smartphone } from 'lucide-react';

import { COMPANY, toTelHref } from 'constants/company';

export interface ContactDetail {
  key: string;
  icon: LucideIcon;
  text: string;
  href?: string;
}

/** Dirección, teléfonos y correo de Clavel (pie y página de Contactar). */
export const useContactDetails = (): ContactDetail[] => {
  const { t } = useTranslation();

  return [
    { key: 'address', icon: MapPin, text: t('contact.address') },
    { key: 'phone', icon: Phone, text: COMPANY.phone, href: toTelHref(COMPANY.phone) },
    { key: 'mobile', icon: Smartphone, text: COMPANY.mobile, href: toTelHref(COMPANY.mobile) },
    { key: 'email', icon: Mail, text: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ];
};
