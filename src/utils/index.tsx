import i18n from '@locales/index';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getLanguageName = (languageCode: string) => {
  switch (languageCode) {
    case 'vi':
      return i18n.t('settings.language.vietnamese');

    default:
      return i18n.t('settings.language.english');
  }
};
