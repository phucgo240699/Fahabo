import i18n from 'i18n-js';
import en from './en.json';
import vn from './vn.json';

i18n.fallbacks = true;
// i18n.translations = {en};
i18n.translations = {
  en: {
    ...en,
  },
  vn: {
    ...vn,
  },
};

i18n.defaultLocale = 'vn';
i18n.locale = 'vn';
i18n.currentLocale();

export default i18n;
