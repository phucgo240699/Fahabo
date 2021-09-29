const shades = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  CONCRETE: '#F2F2F2',
  SILVER: '#C0C0C0',
  GRAY: '#8C8C8C',
  BLACK: '#000000', // 090014
  THEME_COLOR_1: '#FFF1CC',
  THEME_COLOR_2: '#FFE9B3',
  THEME_COLOR_3: '#FFE299',
  THEME_COLOR_4: '#FFD466',
  THEME_COLOR_5: '#FFC634',
  THEME_COLOR_6: '#FFB700',
  THEME_COLOR_7: '#CC9200',
  THEME_COLOR_8: '#996E00',
  THEME_COLOR_9: '#664900',
  THEME_COLOR_10: '#332500',
  THEME_OPPOSITE_COLOR_10: '#1A0033',
  RED_1: '#ff0011',
  YELLOW_1: '#E6CF00',
  GREEN_1: '#00CC99',
  DANUBE: '#6988D7',
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
