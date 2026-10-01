import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'constants/languages';

/**
 * Inicializa i18next. Los textos se cargan en runtime desde
 * `/locales/{{lng}}/translation.json` (http-backend). Hay un fichero por idioma
 * (es, en); añadir uno nuevo es tan simple como crear su fichero de traducción y
 * registrarlo en `SUPPORTED_LANGUAGES`.
 *
 * El español es el idioma por defecto: la detección NO usa el idioma del
 * navegador, de modo que una primera visita siempre arranca en español. Se
 * recuerda la elección manual del usuario (localStorage) y se permite forzar el
 * idioma por querystring (?lng=en).
 */
export const i18nextInit = () => {
  // Mantiene el atributo <html lang> sincronizado con el idioma activo.
  i18n.on('languageChanged', (language) => {
    document.documentElement.lang = language;
  });

  return i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: import.meta.env.DEV,
      fallbackLng: DEFAULT_LANGUAGE,
      supportedLngs: SUPPORTED_LANGUAGES.map((language) => language.code),
      ns: ['translation'],
      defaultNS: 'translation',
      detection: {
        order: ['querystring', 'localStorage'],
        lookupQuerystring: 'lng',
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
      backend: {
        // La versión (una por build) evita que la caché sirva textos de otra versión.
        loadPath: `/locales/{{lng}}/{{ns}}.json?v=${__LOCALES_VERSION__}`,
      },
    });
};
