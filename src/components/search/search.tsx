import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';

import { SUPPORTED_LANGUAGES } from 'constants/languages';
import {
  buildSearchIndex,
  loadSearchResources,
  MIN_QUERY_LENGTH,
  normalize,
  search,
  SearchIndex,
} from 'libs/search';

import styles from './search.module.css';

/**
 * Marca en `text` las palabras buscadas. Compara sin tildes ni mayúsculas
 * carácter a carácter, así que las posiciones coinciden con el texto original.
 */
const Highlight = ({ text, terms }: { text: string; terms: string[] }) => {
  const chars = [...text];
  const normalized = chars.map((char) => normalize(char));
  // Si algún carácter cambia de longitud al normalizarse, no se marca nada.
  if (normalized.some((char) => char.length !== 1)) {
    return <>{text}</>;
  }
  const flat = normalized.join('');
  const marked = new Array<boolean>(chars.length).fill(false);
  terms.forEach((term) => {
    let from = flat.indexOf(term);
    while (from >= 0) {
      marked.fill(true, from, from + term.length);
      from = flat.indexOf(term, from + term.length);
    }
  });

  const parts: { text: string; mark: boolean }[] = [];
  chars.forEach((char, position) => {
    const last = parts[parts.length - 1];
    if (last && last.mark === marked[position]) {
      last.text += char;
    } else {
      parts.push({ text: char, mark: marked[position] });
    }
  });
  return (
    <>
      {parts.map((part, position) =>
        part.mark ? <mark key={position}>{part.text}</mark> : part.text,
      )}
    </>
  );
};

/**
 * Lupa del menú principal y panel de búsqueda. Al abrirse por primera vez carga
 * los textos de los cinco idiomas y construye el índice; a partir de 3 letras
 * muestra los mejores resultados (productos, noticias y el resto de páginas),
 * cada uno con un enlace a su página. Se cierra con Escape, al pulsar fuera o al
 * elegir un resultado.
 */
export const Search = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [failed, setFailed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Al navegar (p. ej. tras elegir un resultado) se cierra.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Índice: se construye una vez, la primera vez que se abre.
  useEffect(() => {
    if (!open || index) {
      return;
    }
    loadSearchResources()
      .then((resources) => setIndex(buildSearchIndex(resources)))
      .catch(() => setFailed(true));
  }, [open, index]);

  // Abierto: foco en el campo, sin scroll de fondo y Escape para cerrar.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    inputRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const language = i18n.resolvedLanguage ?? i18n.language;
  const results = useMemo(
    () => (index ? search(index, query, language) : []),
    [index, query, language],
  );
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const ready = query.trim().length >= MIN_QUERY_LENGTH;

  // Flechas: del campo a la lista y por los resultados.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }
    const links = [...(listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])];
    if (links.length === 0) {
      return;
    }
    event.preventDefault();
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === 'ArrowDown') {
      links[Math.min(links.length - 1, current + 1)].focus();
    } else if (current <= 0) {
      inputRef.current?.focus();
    } else {
      links[current - 1].focus();
    }
  };

  const status = failed
    ? t('search.noResults', { query: query.trim() })
    : !ready
      ? t('search.hint')
      : !index
        ? t('search.loading')
        : results.length === 0
          ? t('search.noResults', { query: query.trim() })
          : '';

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-label={t('search.open')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <SearchIcon size={20} aria-hidden />
      </button>

      {open &&
        createPortal(
          <div
            className={styles.overlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                close();
              }
            }}
          >
            <div
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label={t('search.label')}
              onKeyDown={onKeyDown}
            >
              <div className={styles.field}>
                <SearchIcon size={22} className={styles.fieldIcon} aria-hidden />
                <input
                  ref={inputRef}
                  type="search"
                  className={styles.input}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('search.placeholder')}
                  aria-label={t('search.label')}
                  aria-controls="search-results"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className={styles.close}
                  aria-label={t('search.close')}
                  onClick={close}
                >
                  <X size={20} aria-hidden />
                </button>
              </div>

              <p className={styles.status} role="status">
                {status}
              </p>

              {ready && results.length > 0 && (
                <ul id="search-results" ref={listRef} className={styles.results}>
                  {results.map((result) => {
                    const title = result.title ?? t(result.titleKey);
                    const otherLanguage =
                      result.snippet && result.snippet.language !== language
                        ? SUPPORTED_LANGUAGES.find((item) => item.code === result.snippet?.language)
                            ?.label
                        : undefined;
                    return (
                      <li key={result.path}>
                        <Link to={result.path} className={styles.result} onClick={close}>
                          <span className={styles.meta}>
                            <span className={styles.type}>{t(`search.types.${result.type}`)}</span>
                            {otherLanguage && (
                              <span className={styles.language}>{otherLanguage}</span>
                            )}
                          </span>
                          <span className={styles.title}>
                            <Highlight text={title} terms={terms} />
                          </span>
                          <span className={styles.snippet}>
                            {result.snippet ? (
                              <Highlight text={result.snippet.text} terms={terms} />
                            ) : (
                              result.subtitleKey && t(result.subtitleKey)
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
