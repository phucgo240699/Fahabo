const shades = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  SILVER: '#C0C0C0',
  BLACK: '#000000',
  SUNGLOW: '#FFC634',
  TORY_BLUE: '#304D95',
};

const applied = {
  BACKGROUND: shades.WHITE,
  TABBAR_INACTIVE: shades.WHITE,
  TABBAR_ACTIVE: shades.BLACK,
};

export default {
  ...shades,
  ...applied,
};
