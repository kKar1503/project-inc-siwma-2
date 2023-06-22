import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line import/extensions
import en from '@/locales/en/translation.json';
// eslint-disable-next-line import/extensions
import cn from '@/locales/cn/translation.json';

export const defaultLang = 'en';
export const resources = {
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: defaultLang, // Set the default language
  fallbackLng: 'en', // Fallback language if translation is not available for the current language
  debug: true, // Set to true for development mode
  resources,
  interpolation: {
    escapeValue: false, // React handles escaping by default
  },
  ns: ['translation'], // Namespaces for your translations
  defaultNS: 'translation', // Default namespace
});

export default i18n;
