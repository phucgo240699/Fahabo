const shades = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  SILVER: '#C0C0C0',
  BLACK: '#0D001A',
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
};

const applied = {
  BACKGROUND: shades.WHITE,
  TABBAR_INACTIVE: shades.WHITE,
  TABBAR_ACTIVE: shades.BLACK,
  BLACK_ALPHA50: `${shades.BLACK}80`,
};

export default {
  shades,
  ...shades,
  ...applied,
};
