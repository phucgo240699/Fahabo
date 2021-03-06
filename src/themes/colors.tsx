import {Appearance} from 'react-native';

export const shades = {
  TRANSPARENT: 'transparent',
  WHITE: Appearance.getColorScheme() === 'light' ? '#FFFFFF' : '#000000',
  CONCRETE: Appearance.getColorScheme() === 'light' ? '#F2F2F2' : '#595959',
  SILVER: Appearance.getColorScheme() === 'light' ? '#C0C0C0' : '#8C8C8C',
  GRAY: Appearance.getColorScheme() === 'light' ? '#8C8C8C' : '#C0C0C0',
  DARK_GRAY: Appearance.getColorScheme() === 'light' ? '#595959' : '#F2F2F2',
  BLACK: Appearance.getColorScheme() === 'light' ? '#000000' : '#FFFFFF',
  THEME_COLOR_1:
    Appearance.getColorScheme() === 'light' ? '#FFF1CC' : '#332500',
  THEME_COLOR_2:
    Appearance.getColorScheme() === 'light' ? '#FFE9B3' : '#664900',
  THEME_COLOR_3:
    Appearance.getColorScheme() === 'light' ? '#FFE299' : '#996E00',
  THEME_COLOR_4:
    Appearance.getColorScheme() === 'light' ? '#FFD466' : '#CC9200',
  THEME_COLOR_5:
    Appearance.getColorScheme() === 'light' ? '#FFC634' : '#FFB700',
  THEME_COLOR_6:
    Appearance.getColorScheme() === 'light' ? '#FFB700' : '#FFC634',
  THEME_COLOR_7:
    Appearance.getColorScheme() === 'light' ? '#CC9200' : '#FFD466',
  THEME_COLOR_8:
    Appearance.getColorScheme() === 'light' ? '#996E00' : '#FFE299',
  THEME_COLOR_9:
    Appearance.getColorScheme() === 'light' ? '#664900' : '#FFE9B3',
  THEME_COLOR_10:
    Appearance.getColorScheme() === 'light' ? '#332500' : '#FFF1CC',
  FLASH_SCREEN: '#FFDE59',
  RED_1: '#ff4000', //ff0011
  YELLOW_1: '#FFE600',
  GREEN_1: '#00b359',
  DANUBE: Appearance.getColorScheme() === 'light' ? '#5e7fd4' : '#728fda',
  ZEST: '#E87E24',
  ROYAL_BLUE: Appearance.getColorScheme() === 'light' ? '#134db9' : '#4680ec',
  CORNFLOWER_BLUE:
    Appearance.getColorScheme() === 'light' ? '#4680ec' : '#134db9',
  // SAPPHIRE: '#304D95',
  BLAZE_ORANGE: Appearance.getColorScheme() === 'light' ? '#FF6A00' : '#FF6D03',
};

export const applied = {
  BACKGROUND: Appearance.getColorScheme() === 'light' ? '#FFFFFF' : '#000000',
  HYPER_LINK: Appearance.getColorScheme() === 'light' ? '#0066cc' : '#0078f0',
  EXPIRED_CHORE:
    Appearance.getColorScheme() === 'light' ? '#cc3300' : '#ff531a',
  IN_PROGRESS_CHORE:
    Appearance.getColorScheme() === 'light' ? '#324f9a' : '#5273c7',
  DONE_CHORE: Appearance.getColorScheme() === 'light' ? '#009444' : '#00CC5F',
  TABBAR_INACTIVE:
    Appearance.getColorScheme() === 'light' ? '#FFFFFF' : '#000000',
  TABBAR_ACTIVE:
    Appearance.getColorScheme() === 'light' ? '#000000' : '#FFFFFF',
  TEXT: Appearance.getColorScheme() === 'light' ? '#333333' : '#f2f2f2',
  CAMERA_BACKGROUND: '#000000',
  BLACK_ALPHA50: `${
    Appearance.getColorScheme() === 'light' ? '#000000' : '#595959'
  }80`,
};

let colors = {...shades, ...applied};

export default colors;
