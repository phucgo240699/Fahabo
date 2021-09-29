import i18n from 'i18n-js';
import en from './en.json';
import vi from './vi.json';
// import {useSelector} from 'react-redux';
// import {languageCodeSelector} from '@store/selectors/authentication';

// const languageCode = useSelector(languageCodeSelector);

i18n.fallbacks = true;
i18n.translations = {
  en: {
    ...en,
  },
  vi: {
    ...vi,
  },
};

i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;
