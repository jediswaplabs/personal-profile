import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import enTranslations from '../../public/locales/en/translation.json';
import inTranslations from '../../public/locales/in/translation.json';

i18n.use(initReactI18next)
  .init({
    debug: true,
    lng: 'in',
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs: ['en', 'in'],
    resources: {
      en: { translation: enTranslations },
      in: { translation: inTranslations },
    },
  });

export default i18n;
