import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import enTranslations from '../../public/locales/en/translation.json';
import inTranslations from '../../public/locales/hi/translation.json';

i18n.use(initReactI18next)
  .init({
    debug: true,
    lng: 'hi',
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs: ['en', 'hi'],
    resources: {
      en: { translation: enTranslations },
      hi: { translation: inTranslations },
    },
  });

export default i18n;
