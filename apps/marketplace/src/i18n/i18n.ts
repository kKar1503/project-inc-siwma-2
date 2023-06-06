import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import translationEN from '../locales/en/translation.json';
import translationZN from '../locales/cn/translation.json';

export const defaultNS = 'en';
export const resources = {
  en: {
    translation: translationEN,
  },
  cn: {
    translation: translationZN,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en', // Set the default language
  fallbackLng: 'en', // Fallback language if translation is not available for the current language
  debug: false, // Set to true for development mode
  resources,
  interpolation: {
    escapeValue: false, // React handles escaping by default
  },
  ns: ['translation'], // Namespaces for your translations
  defaultNS: 'translation', // Default namespace
});


export default i18n;
