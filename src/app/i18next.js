import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
// import Backend from 'i18next-http-backend';

import enTranslations from '../../public/locales/en/translation.json';

i18n.use(initReactI18next)
  // .use(Backend)
  .init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs: ['en'],
    resources: {
      en: {
        translation: enTranslations,
      },
    },
  });

export default i18n;
