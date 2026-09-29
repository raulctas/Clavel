import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Check, ChevronDown, Globe } from 'lucide-react';

import { SUPPORTED_LANGUAGES } from 'constants/languages';

import styles from './language-selector.module.css';

/**
 * Selector de idioma: globo + código + chevron con desplegable. Se usa igual en
 * la cabecera de escritorio y en la barra móvil (con cinco idiomas no caben
 * todos los códigos a la vista en un móvil).
 */
export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    SUPPORTED_LANGUAGES.find((language) => i18n.language?.startsWith(language.code)) ??
    SUPPORTED_LANGUAGES[0];

  // Se cierra al navegar.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Se cierra al pulsar fuera y con Escape. Los listeners solo existen abierto.
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

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={styles.selector} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('common.languageSelector')}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe size={17} aria-hidden />
        {current.code.toUpperCase()}
        <ChevronDown
          size={14}
          className={[styles.chevron, open && styles.chevronOpen].filter(Boolean).join(' ')}
          aria-hidden
        />
      </button>

      {open && (
        <div className={styles.menu} role="listbox" aria-label={t('common.languageSelector')}>
          {SUPPORTED_LANGUAGES.map((language) => {
            const isActive = language.code === current.code;
            return (
              <button
                key={language.code}
                type="button"
                role="option"
                lang={language.code}
                aria-selected={isActive}
                className={[styles.option, isActive && styles.optionActive]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => changeLanguage(language.code)}
              >
                <span className={styles.optionLabel}>
                  <span className={styles.optionCode}>{language.code.toUpperCase()}</span>
                  {language.label}
                </span>
                <Check
                  size={16}
                  className={[styles.check, isActive && styles.checkVisible]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
