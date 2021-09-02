const shades = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
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
