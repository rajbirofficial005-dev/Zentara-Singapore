import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Cache version - increment this when locale files are updated
const LOCALE_VERSION = '2026-03-27-v11';

const initPromise = i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    supportedLngs: [
      'en','es','fr','de','it','pt',
      'zh','ja','ko','ar','hi','ru',
      'th','vi','id','ms','tl','bn','ur','ta'
    ],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: `/locales/{{lng}}.json?v=${LOCALE_VERSION}`,
      crossDomain: false,
      withCredentials: false
    },
    react: { 
      useSuspense: true
    },
    interpolation: {
      escapeValue: false
    },
    load: 'languageOnly',
    ns: ['translation'],
    defaultNS: 'translation'
  });

export default i18n;
export { initPromise };