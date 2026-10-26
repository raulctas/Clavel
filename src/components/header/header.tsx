import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { Button } from 'components/button';
import { LanguageSelector } from 'components/language-selector';
import { Search } from 'components/search';
import { routes } from 'constants/routes';

import { CompanyMenu } from './company-menu';
import { COMPANY_PAGES } from './company-pages';
import styles from './header.module.css';

interface NavItem {
  to: string;
  labelKey: string;
  /** Activo solo en la ruta exacta (Inicio). */
  end?: boolean;
}

/**
 * Páginas de la barra de escritorio tras el desplegable «Empresa»: Inicio va en
 * el logo y Contactar en el botón.
 */
const DESKTOP_NAV: NavItem[] = [
  { to: routes.products, labelKey: 'nav.products' },
  { to: routes.news, labelKey: 'nav.news' },
];

/** Páginas del menú móvil: todas, también las de «Empresa». */
const MOBILE_NAV: NavItem[] = [
  { to: routes.home, labelKey: 'nav.home', end: true },
  ...COMPANY_PAGES,
  ...DESKTOP_NAV,
  { to: routes.contact, labelKey: 'nav.contact' },
];

/** A partir de este desplazamiento (px) la barra se vuelve más opaca. */
const SCROLLED_FROM = 16;

/**
 * Logo vertical (el principal), en SVG: a 124 px de ancho en la barra de
 * escritorio y a 84 px en la de móvil.
 */
const LOGO_SRC = '/images/logo/clavel-logo-v3.svg';

const linkClass =
  (base: string, active: string) =>
  ({ isActive }: { isActive: boolean }) =>
    [base, isActive && active].filter(Boolean).join(' ');

/**
 * Cabecera tradicional: barra translúcida de ancho completo, fija arriba, con
 * el logo vertical a la izquierda y las páginas, la búsqueda, el idioma y
 * «Contactar» a la derecha. Al bajar por la página se vuelve más opaca. Como es
 * fija, deja en su sitio un hueco de su altura para que no tape el contenido.
 *
 * Por debajo de 900px se sustituye por una barra con logo, búsqueda, idioma y
 * botón de menú que despliega todas las páginas.
 */
export const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_FROM);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú móvil al navegar.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /**
   * Cierra el menú móvil al pulsar fuera o con Escape. La referencia es la
   * barra entera y no solo el panel: si el botón quedara fuera, su pulsación
   * cerraría el menú aquí y su `onClick` lo volvería a abrir.
   */
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onPressOutside = (event: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onPressOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPressOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.spacer} aria-hidden />

      <header className={[styles.desktop, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
        <div className={styles.inner}>
          <Link to={routes.home} className={styles.logo} aria-label={t('common.homeLink')}>
            <img src={LOGO_SRC} alt={t('common.companyName')} width={124} height={82} />
          </Link>

          <nav className={styles.desktopNav} aria-label={t('nav.main')}>
            <ul className={styles.nav}>
              <li>
                <CompanyMenu />
              </li>
              {DESKTOP_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClass(styles.navLink, styles.active)}>
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Herramientas juntas (buscar e idioma), separadas de las páginas. */}
          <div className={styles.tools}>
            <Search />
            <LanguageSelector />
          </div>

          <Button to={routes.contact} size="sm">
            {t('nav.contact')}
          </Button>
        </div>
      </header>

      <header
        className={[styles.mobile, scrolled && styles.scrolled].filter(Boolean).join(' ')}
        ref={mobileRef}
      >
        <div className={styles.bar}>
          <Link to={routes.home} className={styles.mobileLogo} aria-label={t('common.homeLink')}>
            <img src={LOGO_SRC} alt={t('common.companyName')} width={84} height={55} />
          </Link>

          <div className={styles.barActions}>
            <Search />
            <LanguageSelector />
            <button
              type="button"
              className={styles.menuButton}
              aria-label={t(menuOpen ? 'nav.closeMenu' : 'nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className={styles.mobileMenu} aria-label={t('nav.main')}>
            <ul>
              {MOBILE_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={linkClass(styles.mobileLink, styles.active)}
                  >
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};
