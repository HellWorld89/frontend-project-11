import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ruTranslation from './locales/ru/translation.json'
import enTranslation from './locales/en/translation.json'

const i18nInstance = i18next.createInstance()

i18nInstance
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    debug: false,
    resources: {
      ru: { translation: ruTranslation },
      en: { translation: enTranslation },
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
  })
  .then(() => {
    console.log('i18next initialization completed')
  })
  .catch((error) => {
    console.error('i18next initialization failed:', error)
  })

export default i18nInstance
