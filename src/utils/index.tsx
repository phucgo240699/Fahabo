import i18n from '@locales/index';
import {NativeModules, Platform} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';

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

export const getOriginDateStringWithMinimumDate = (date: Date) => {
  const month: string =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  return `01-${month}-${date.getFullYear()}`; // DD-MM-YYYY
};

export const getOriginDateStringWithMaximumDate = (date: Date) => {
  const month: string =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  return `31-${month}-${date.getFullYear()}`; // DD-MM-YYYY
};

export const getOriginDateTimeString = (date: Date) => {
  const day: string =
    date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month: string =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const hour: string =
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours().toString();
  const minute: string =
    date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes().toString();
  const second: string =
    date.getSeconds() < 10
      ? `0${date.getSeconds()}`
      : date.getSeconds().toString();
  return `${day}-${month}-${date.getFullYear()} ${hour}:${minute}:${second}`; // DD-MM-YYYY
};

export const getOriginDateStringFromYYYYMMDDString = (
  value: string,
  separator: string,
) => {
  const elements = value.split(separator);
  const day = elements[2];
  const month = elements[1];
  const year = elements[0];
  return `${day}-${month}-${year}`;
};

export const getYYYYMMDDStringFromOriginDateString = (
  value: string,
  separator: string,
) => {
  const elements = value.split(separator);
  const day = elements[0];
  const month = elements[1];
  const year = elements[2];
  return `${year}-${month}-${day}`;
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

export const getDateTimeStringFrom = (originDateString: string) => {
  const array = originDateString.split(' ');

  const dateElements = array[0].split('-'); // DD-MM-YYYY
  const day = dateElements[0];
  const month = dateElements[1];
  const year = dateElements[2];

  const timeElements = array[1].split(':'); // HH:MM:SS
  const hour = timeElements[0];
  const minute = timeElements[1];
  const second = timeElements[2];
  switch (i18n.locale) {
    case 'vi':
      return `${day}-${month}-${year} ${hour}:${minute}`;

    default:
      return `${month}-${day}-${year} ${hour}:${minute}`;
  }
};

export function convertOriginDateStringToDate(originDateString: string) {
  let datePieces = originDateString.split('-');
  return new Date(
    parseInt(datePieces[2]),
    parseInt(datePieces[1]) - 1,
    parseInt(datePieces[0]),
    0,
    0,
    0,
  );
}

export function convertOriginDateTimeStringToDate(
  originDateTimeString: string,
) {
  let dateComponents = originDateTimeString.split(' ');
  let datePieces = dateComponents[0].split('-');
  let timePieces = dateComponents[1].split(':');
  return new Date(
    parseInt(datePieces[2]),
    parseInt(datePieces[1]) - 1,
    parseInt(datePieces[0]),
    parseInt(timePieces[0]),
    parseInt(timePieces[1]),
    parseInt(timePieces[2]),
  );
}

export function getDateMinusOneMonth(_date: Date): Date {
  const result = new Date(_date);
  if (_date.getMonth() === 0) {
    result.setFullYear(_date.getFullYear() - 1);
    result.setMonth(11);
  } else {
    result.setMonth(_date.getMonth() - 1);
  }
  return result;
}

export function getDatePlusOneMonth(_date: Date): Date {
  const result = new Date(_date);
  if (_date.getMonth() === 11) {
    result.setFullYear(_date.getFullYear() + 1);
    result.setMonth(0);
  } else {
    result.setMonth(_date.getMonth() + 1);
  }
  return result;
}

export const getLanguageName = (languageCode: string) => {
  switch (languageCode) {
    case 'vi':
      return i18n.t('settings.language.vietnamese');
    case 'en':
      return i18n.t('settings.language.english');
    default:
      return i18n.t('settings.language.auto');
  }
};

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

export const setGlobalLocale = (_locale: string) => {
  switch (_locale) {
    case 'vi':
      i18n.locale = _locale;
      i18n.defaultLocale = _locale;
      LocaleConfig.locales.en = LocaleConfig.locales[''];
      LocaleConfig.locales.vi = {
        monthNames: [
          'Th??ng 1',
          'Th??ng 2',
          'Th??ng 3',
          'Th??ng 4',
          'Th??ng 5',
          'Th??ng 6',
          'Th??ng 7',
          'Th??ng 8',
          'Th??ng 9',
          'Th??ng 10',
          'Th??ng 11',
          'Th??ng 12',
        ],
        monthNamesShort: [
          'Th??ng 1',
          'Th??ng 2',
          'Th??ng 3',
          'Th??ng 4',
          'Th??ng 5',
          'Th??ng 6',
          'Th??ng 7',
          'Th??ng 8',
          'Th??ng 9',
          'Th??ng 10',
          'Th??ng 11',
          'Th??ng 12',
        ],
        dayNames: [
          'Th??? hai',
          'Th??? ba',
          'Th??? t??',
          'Th??? n??m',
          'Th??? s??u',
          'Th??? b???y',
          'Ch??? nh???t',
        ],
        dayNamesShort: ['Hai', 'Ba', 'T??', 'N??m', 'S??u', 'B???y', 'CN'],
      };
      LocaleConfig.defaultLocale = _locale;
      break;
    case 'en':
      i18n.locale = _locale;
      i18n.defaultLocale = _locale;

      LocaleConfig.locales.en = LocaleConfig.locales[''];
      LocaleConfig.locales.en = {
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthNamesShort: [
          'Jan.',
          'Feb.',
          'Mar.',
          'Apr.',
          'May.',
          'Jun.',
          'Jul.',
          'Aug.',
          'Sep.',
          'Oct.',
          'Nov.',
          'Dec.',
        ],
        dayNames: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sar', 'Sun'],
      };
      LocaleConfig.defaultLocale = _locale;
      break;
    default:
      const defaultLanguageCode = getDefaultLanguageCode();
      i18n.locale = defaultLanguageCode;
      i18n.defaultLocale = defaultLanguageCode;

      LocaleConfig.locales.en = LocaleConfig.locales[''];
      LocaleConfig.locales.en = {
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthNamesShort: [
          'Jan.',
          'Feb.',
          'Mar.',
          'Apr.',
          'May.',
          'Jun.',
          'Jul.',
          'Aug.',
          'Sep.',
          'Oct.',
          'Nov.',
          'Dec.',
        ],
        dayNames: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sar', 'Sun'],
      };
      LocaleConfig.defaultLocale = defaultLanguageCode;
      break;
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

export const getNumberWithCommas = (x: number) => {
  const rawResult = x.toString();
  if (rawResult.length < 4) {
    return rawResult;
  }
  return rawResult.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
