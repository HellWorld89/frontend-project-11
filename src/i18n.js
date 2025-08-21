import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nInstance = i18next.createInstance();

i18nInstance
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18nInstance;
