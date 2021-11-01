import i18n from '@locales/index';
import {NativeModules, Platform} from 'react-native';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getOriginDateString = (date: Date) => {
  const day: string =
    date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month: string =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  return `${day}-${month}-${date.getFullYear()}`; // DD-MM-YYYY
};

export const getDateStringFrom = (originDateString: string) => {
  const elements = originDateString.split('-'); // DD-MM-YYYY
  const day = elements[0];
  const month = elements[1];
  const year = elements[2];
  switch (i18n.locale) {
    case 'vi':
      return `${day}-${month}-${year}`;

    default:
      return `${month}-${day}-${year}`;
  }
};

// export const getLanguageName = (languageCode: string) => {
//   switch (languageCode) {
//     case 'vi':
//       return i18n.t('settings.language.vietnamese');
//     case 'en':
//       return i18n.t('settings.language.english');
//     default:
//       return i18n.t('settings.language.auto');
//   }
// };

export const getDefaultLanguageCode = () => {
  const code = `${
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier
  }`.split('_')[0];

  switch (code) {
    case 'vi':
      return code;
    default:
      return 'en';
  }
};

export const getPhoneNumber = (
  countryCode: string,
  countryCodeValue: string,
  rawNumber: string,
) => {
  if (rawNumber.length > 0) {
    if (countryCode === '+84') {
      if (rawNumber[0] === countryCodeValue) {
        return `${countryCodeValue}${rawNumber.slice(1, rawNumber.length)}`;
      } else {
        return `${countryCodeValue}${rawNumber}`;
      }
    }
  } else {
    return rawNumber;
  }
};

//check data null
export const isNull = (data: any) => {
  if (data === undefined || data == null || data.length === 0) {
    return true;
  } else if (typeof data === 'string') {
    data = String(data).trim();
    return data === '';
  } else if (typeof data === 'object' && data.constructor === Object) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  }
  return false;
};

export const isNumber = (text: string) => {
  for (let i = 0; i < text.length; ++i) {
    if (text[i] < '0' || text[i] > '9') {
      return false;
    }
  }
  return true;
};
