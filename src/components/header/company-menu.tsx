import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { COMPANY_PAGES } from './company-pages';
import styles from './header.module.css';

/**
 * «Empresa» con desplegable: Quiénes somos, Laboratorio y Producción y
 * logística. Se abre al pulsar y se cierra al navegar, al pulsar fuera o con
 * Escape. Se marca como activo si la página actual es una de las tres.
 */
export const CompanyMenu = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = COMPANY_PAGES.some((page) => pathname.startsWith(page.to));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPressOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPressOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPressOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        className={[styles.navLink, styles.dropdownTrigger, isActive && styles.active]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={open}
        aria-controls="company-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {t('nav.company')}
        <ChevronDown
          size={16}
          className={[styles.chevron, open && styles.chevronOpen].filter(Boolean).join(' ')}
          aria-hidden
        />
      </button>

      {open && (
        <ul id="company-menu" className={styles.dropdownMenu}>
          {COMPANY_PAGES.map((page) => (
            <li key={page.to}>
              <NavLink
                to={page.to}
                className={({ isActive: active }) =>
                  [styles.dropdownLink, active && styles.dropdownLinkActive]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {t(page.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
