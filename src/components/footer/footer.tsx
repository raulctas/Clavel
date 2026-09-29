import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, LucideIcon, Mail, Youtube } from 'lucide-react';

import { Container } from 'components/container';
import { TikTokIcon } from 'components/tiktok-icon';
import { COMPANY, SOCIAL_LINKS } from 'constants/company';
import { routes } from 'constants/routes';
import { useContactDetails } from 'hooks/use-contact-details';

import styles from './footer.module.css';

const PAGES = [
  { to: routes.home, labelKey: 'nav.home' },
  { to: routes.aboutUs, labelKey: 'nav.aboutUs' },
  { to: routes.productsServices, labelKey: 'nav.productsServices' },
  { to: routes.news, labelKey: 'nav.news' },
  { to: routes.team, labelKey: 'nav.team' },
  { to: routes.contact, labelKey: 'nav.contact' },
];

interface SocialItem {
  name: string;
  icon: LucideIcon | typeof TikTokIcon;
  href?: string;
}

const SOCIAL: SocialItem[] = [
  { name: 'Facebook', icon: Facebook, href: SOCIAL_LINKS.facebook },
  { name: 'Instagram', icon: Instagram, href: SOCIAL_LINKS.instagram },
  { name: 'YouTube', icon: Youtube, href: SOCIAL_LINKS.youtube },
  { name: 'LinkedIn', icon: Linkedin, href: SOCIAL_LINKS.linkedin },
  { name: 'TikTok', icon: TikTokIcon, href: SOCIAL_LINKS.tiktok },
  { name: 'Email', icon: Mail, href: `mailto:${COMPANY.email}` },
];

export const Footer = () => {
  const { t } = useTranslation();
  const contactDetails = useContactDetails();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img
              src="/images/logo/clavel-logo-inverse.png"
              alt={t('common.companyName')}
              width={96}
              height={96}
              className={styles.logo}
            />
            <p className={styles.claim}>{t('footer.claim')}</p>
            <ul className={styles.social} aria-label={t('footer.social')}>
              {SOCIAL.map(({ name, icon: Icon, href }) => (
                <li key={name}>
                  {/* Sin URL confirmada, el icono se muestra pero no enlaza a ningún sitio. */}
                  {href ? (
                    <a
                      href={href}
                      className={styles.socialLink}
                      aria-label={name}
                      title={name}
                      {...(href.startsWith('http') && { target: '_blank', rel: 'noopener' })}
                    >
                      <Icon size={20} aria-hidden />
                    </a>
                  ) : (
                    <span className={styles.socialLink} role="img" aria-label={name} title={name}>
                      <Icon size={20} aria-hidden />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.column} aria-label={t('footer.pages')}>
            <h2 className={styles.heading}>{t('footer.pages')}</h2>
            <ul className={styles.list}>
              {PAGES.map((page) => (
                <li key={page.to}>
                  <Link to={page.to} className={styles.link}>
                    {t(page.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.heading}>{t('footer.contact')}</h2>
            <ul className={styles.list}>
              {contactDetails.map(({ key, icon: Icon, text, href }) => (
                <li key={key} className={styles.detail}>
                  <Icon size={16} className={styles.detailIcon} aria-hidden />
                  {href ? (
                    <a href={href} className={styles.link}>
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <Link to={routes.privacy} className={styles.legalLink}>
            {t('nav.privacy')}
          </Link>
        </div>
      </Container>
    </footer>
  );
};
