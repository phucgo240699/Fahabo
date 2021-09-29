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

// i18n.defaultLocale = `${
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale ||
//       NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
//     : NativeModules.I18nManager.localeIdentifier
// }`.split('_')[0];
// i18n.locale = `${
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale ||
//       NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
//     : NativeModules.I18nManager.localeIdentifier
// }`.split('_')[0];

export default i18n;
