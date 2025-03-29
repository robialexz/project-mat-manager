import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en', // Use English if detected language is not available
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    // Define supported languages
    supportedLngs: ['en', 'ro', 'es', 'it'], 
    // Backend options for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
     // Language detector options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'], // Order of detection methods
      caches: ['localStorage'], // Cache the language in localStorage
    },
  });

export default i18n;
