import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: {escapeValue: false},
    react: {useSuspense: false},
    supportedLngs: ['en', 'in'],
    resources: {
      en: {
        translation: require('../public/locales/en/translation.json'),
      },
      in: {
        translation: require('../public/locales/in/translation.json'),
      },
    },
  });

export default i18n;
