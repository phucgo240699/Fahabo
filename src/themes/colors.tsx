import {extendTheme} from 'native-base';

const shades = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  SILVER: '#C0C0C0',
  BLACK: '#000000',
  THEME_COLOR_1: '#FFF1CC',
  THEME_COLOR_2: '#FFE9B3',
  THEME_COLOR_3: '#FFE299',
  THEME_COLOR_4: '#FFD466',
  THEME_COLOR_5: '#FFC634',
  THEME_COLOR_6: '#FFB700',
  THEME_COLOR_7: '#CC9200',
  THEME_COLOR_8: '#996E00',
  THEME_COLOR_9: '#805B00',
  THEME_COLOR_10: '#4D3700',
  RED_1: '#D1000E',
  TORY_BLUE: '#304D95',
};

const applied = {
  BACKGROUND: shades.WHITE,
  TABBAR_INACTIVE: shades.WHITE,
  TABBAR_ACTIVE: shades.BLACK,
};

export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: shades.THEME_COLOR_1,
      100: shades.THEME_COLOR_2,
      200: shades.THEME_COLOR_3,
      300: shades.THEME_COLOR_4,
      400: shades.THEME_COLOR_5,
      500: shades.THEME_COLOR_6,
      600: shades.THEME_COLOR_7,
      700: shades.THEME_COLOR_8,
      800: shades.THEME_COLOR_9,
      900: shades.THEME_COLOR_10,
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

export default {
  ...shades,
  ...applied,
};
