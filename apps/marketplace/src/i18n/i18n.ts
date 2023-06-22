import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line import/extensions
import en from '@/locales/en/translation.json';
// eslint-disable-next-line import/extensions
import cn from '@/locales/cn/translation.json';

if (!i18n.isInitialized) {
  const defaultLang = 'en';
  const resources = {
    en: {
      translation: en,
    },
    cn: {
      translation: cn,
    },
  } as const;

  // console.log('initI18n');
  i18n
    .use(initReactI18next)
    .init({
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
}
export default i18n;
