import i18n from 'i18n-js';
import en from './en.json';

i18n.fallbacks = true;
i18n.translations = {en};
i18n.translations = {
  en: {
    ...en,
  },
};

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.currentLocale();

export default i18n;
