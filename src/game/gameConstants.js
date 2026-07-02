export const GAME_VERSION = '0.1';

export const STARTING_LAND_COUNT = 1;
export const CROP_SLOTS_PER_LAND = 16;

export const CROP_TYPES = Object.freeze({
  WHEAT: 'wheat',
});

export const CROP_SLOT_STATUS = Object.freeze({
  EMPTY: 'empty',
  PLANTED: 'planted',
  GROWING: 'growing',
  MATURE: 'mature',
  HARVESTED: 'harvested',
});

export const INITIAL_INVENTORY = Object.freeze({
  gold: 0,
  wheatSeeds: 4,
  wheat: 0,
});

export const WHEAT_SEED_COST = 100;
export const PAWN_SHOP_WHEAT_SELL_PRICE = 110;

export const REAL_WHEAT_GROWTH_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
export const DEV_WHEAT_GROWTH_DURATION_MS = 60 * 1000;

export const GROWTH_MODES = Object.freeze({
  REAL: 'real',
  DEV_FAST: 'devFast',
});

export const ACTIVE_GROWTH_MODE = GROWTH_MODES.DEV_FAST;
export const ACTIVE_GROWTH_MODE_LABEL = 'Dev Fast Growth Mode';
export const ACTIVE_WHEAT_GROWTH_DURATION_MS =
  ACTIVE_GROWTH_MODE === GROWTH_MODES.DEV_FAST
    ? DEV_WHEAT_GROWTH_DURATION_MS
    : REAL_WHEAT_GROWTH_DURATION_MS;

export const GROWTH_RECALCULATION_INTERVAL_MS = 1000;
