import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { Button } from 'components/button';
import { LanguageSelector } from 'components/language-selector';
import { Search } from 'components/search';
import { routes } from 'constants/routes';

import styles from './header.module.css';

interface NavItem {
  to: string;
  labelKey: string;
  /** Activo solo en la ruta exacta (Inicio). */
  end?: boolean;
}

/** Páginas de la cápsula de escritorio: Inicio va en el logo y Contactar en el botón. */
const DESKTOP_NAV: NavItem[] = [
  { to: routes.aboutUs, labelKey: 'nav.aboutUs' },
  { to: routes.products, labelKey: 'nav.products' },
  { to: routes.news, labelKey: 'nav.news' },
];

/** Páginas del menú móvil: todas. */
const MOBILE_NAV: NavItem[] = [
  { to: routes.home, labelKey: 'nav.home', end: true },
  ...DESKTOP_NAV,
  { to: routes.contact, labelKey: 'nav.contact' },
];

const LOGO_SRC = '/images/logo/clavel-logo-color.png';

const linkClass =
  (base: string, active: string) =>
  ({ isActive }: { isActive: boolean }) =>
    [base, isActive && active].filter(Boolean).join(' ');

/**
 * Cabecera «Mínimo»: cápsula blanca flotante y centrada, con el logo en un
 * círculo que sobresale por arriba y por abajo. No ocupa altura en el flujo,
 * así que el primer bloque de cada página llega hasta arriba (y reserva el
 * hueco con su propio padding superior).
 *
 * Por debajo de 900px se sustituye por una barra con logo, interruptor de
 * idioma y botón de menú que despliega las cinco páginas.
 */
export const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

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
      <header className={styles.desktop}>
        <div className={styles.capsule}>
          <Link to={routes.home} className={styles.logoSlot} aria-label={t('common.homeLink')}>
            <span className={styles.logoBadge}>
              <img src={LOGO_SRC} alt={t('common.companyName')} width={116} height={116} />
            </span>
          </Link>

          <nav aria-label={t('nav.main')}>
            <ul className={styles.nav}>
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

      <header className={styles.mobile} ref={mobileRef}>
        <div className={styles.bar}>
          <Link to={routes.home} className={styles.mobileLogo} aria-label={t('common.homeLink')}>
            <img src={LOGO_SRC} alt={t('common.companyName')} width={96} height={96} />
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
