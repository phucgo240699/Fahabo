import i18n from 'i18n-js';
import en from './en.json';
import vi from './vi.json';

i18n.fallbacks = true;
i18n.translations = {
  en: {
    ...en,
  },
  vi: {
    ...vi,
  },
};

export default i18n;
