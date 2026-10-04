import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Container } from 'components/container';
import { routes } from 'constants/routes';
import { useContactDetails } from 'hooks/use-contact-details';

import styles from './footer.module.css';

const PAGES = [
  { to: routes.home, labelKey: 'nav.home' },
  { to: routes.aboutUs, labelKey: 'nav.aboutUs' },
  { to: routes.products, labelKey: 'nav.products' },
  { to: routes.news, labelKey: 'nav.news' },
  { to: routes.team, labelKey: 'nav.team' },
  { to: routes.contact, labelKey: 'nav.contact' },
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
