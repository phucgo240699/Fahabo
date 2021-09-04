const shades = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  SILVER: '#C0C0C0',
  BLACK: '#000000',
  BARLEY_WHITE: '#FFF1CC',
  PEACH: '#FFE9B3',
  CREAM_BRULEE: '#FFE299',
  DANDELION: '#FFD466',
  SUNGLOW: '#FFC634',
  SELECTIVE_YELLOW: '#FFB700',
  BUDDHA_GOLD: '#CC9200',
  CHELSEA_GEM: '#996E00',
  CINNAMON: '#805B00',
  SADDLE_BROWN: '#4D3700',
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
