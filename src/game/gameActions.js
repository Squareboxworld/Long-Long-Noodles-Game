import {
  CROP_SLOT_STATUS,
  CROP_TYPES,
  INITIAL_PROGRESS,
  PAWN_SHOP_WHEAT_SELL_PRICE,
  WHEAT_SEED_COST,
} from './gameConstants.js';
import { recalculateCropGrowth } from './gameGrowth.js';

const messages = {
  noSeeds: 'You do not have enough wheat seeds.',
  noGold: 'You do not have enough gold.',
  noCropToWater: 'There is no crop here to water.',
  noWheatToSell: 'You do not have wheat to sell.',
  noWheatToHarvest: 'There is no wheat here to harvest.',
  notReadyToHarvest: 'This wheat is not ready yet.',
  plantSuccess: 'Wheat planted.',
  waterSuccess: 'Wheat watered.',
  harvestSuccess: 'You harvested 1 wheat.',
  buySeedSuccess: 'You bought 1 wheat seed.',
  sellWheatSuccess: `You sold 1 wheat for ${PAWN_SHOP_WHEAT_SELL_PRICE} gold.`,
  slotNotEmpty: 'This crop slot is not empty.',
  matureCrop: 'This wheat is already mature.',
  missingSlot: 'Select a crop slot first.',
};

function updateCropSlot(gameState, slotId, updater, updatedAt = new Date().toISOString()) {
  return {
    ...gameState,
    updatedAt,
    farm: {
      ...gameState.farm,
      cropSlots: gameState.farm.cropSlots.map((slot) =>
        slot.slotId === slotId ? updater(slot) : slot,
      ),
    },
  };
}

function getProgressNumber(progress, key) {
  const value = progress?.[key];

  return Number.isFinite(value) ? value : INITIAL_PROGRESS[key];
}

function incrementProgress(gameState, increments) {
  const progress = {
    ...INITIAL_PROGRESS,
    ...gameState.progress,
  };

  Object.entries(increments).forEach(([key, amount]) => {
    progress[key] = Math.max(0, getProgressNumber(progress, key) + amount);
  });

  return {
    ...gameState,
    progress,
  };
}

export function canPlantWheat(gameState, slotId) {
  const slot = gameState.farm.cropSlots.find((cropSlot) => cropSlot.slotId === slotId);

  return Boolean(slot && slot.status === CROP_SLOT_STATUS.EMPTY && gameState.inventory.wheatSeeds > 0);
}

export function canWaterCrop(gameState, slotId) {
  const slot = gameState.farm.cropSlots.find((cropSlot) => cropSlot.slotId === slotId);

  return Boolean(
    slot &&
      slot.cropType === CROP_TYPES.WHEAT &&
      slot.status !== CROP_SLOT_STATUS.EMPTY &&
      slot.status !== CROP_SLOT_STATUS.MATURE &&
      slot.isMature === false,
  );
}

export function canHarvestWheat(gameState, slotId) {
  const slot = gameState.farm.cropSlots.find((cropSlot) => cropSlot.slotId === slotId);

  return Boolean(
    slot &&
      slot.cropType === CROP_TYPES.WHEAT &&
      slot.status === CROP_SLOT_STATUS.MATURE &&
      slot.isMature === true &&
      slot.growthProgress === 100,
  );
}

export function canBuyWheatSeed(gameState) {
  return gameState.inventory.gold >= WHEAT_SEED_COST;
}

export function canSellWheat(gameState) {
  return gameState.inventory.wheat >= 1;
}

export function plantWheat(gameState, slotId, now = new Date().toISOString()) {
  const slot = gameState.farm.cropSlots.find((cropSlot) => cropSlot.slotId === slotId);

  if (!slot) {
    return { gameState, message: messages.missingSlot, success: false };
  }

  if (slot.status !== CROP_SLOT_STATUS.EMPTY) {
    return { gameState, message: messages.slotNotEmpty, success: false };
  }

  if (gameState.inventory.wheatSeeds < 1) {
    return { gameState, message: messages.noSeeds, success: false };
  }

  const nextState = updateCropSlot(
    {
      ...gameState,
      updatedAt: now,
      inventory: {
        ...gameState.inventory,
        wheatSeeds: gameState.inventory.wheatSeeds - 1,
      },
    },
    slotId,
    (cropSlot) => ({
      ...cropSlot,
      cropType: CROP_TYPES.WHEAT,
      status: CROP_SLOT_STATUS.PLANTED,
      plantedAt: now,
      lastWateredAt: null,
      growthStartedAt: now,
      growthProgress: 0,
      isWatered: false,
      isThirsty: false,
      hasWeed: false,
      isMature: false,
    }),
    now,
  );

  return {
    gameState: incrementProgress(
      { ...nextState, updatedAt: now },
      { lifetimeWheatPlanted: 1 },
    ),
    message: messages.plantSuccess,
    success: true,
  };
}

export function waterCrop(gameState, slotId, now = new Date().toISOString()) {
  const slot = gameState.farm.cropSlots.find((cropSlot) => cropSlot.slotId === slotId);

  if (!slot || slot.status === CROP_SLOT_STATUS.EMPTY || slot.cropType !== CROP_TYPES.WHEAT) {
    return { gameState, message: messages.noCropToWater, success: false };
  }

  if (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE) {
    return { gameState, message: messages.matureCrop, success: false };
  }

  const nextState = updateCropSlot(
    gameState,
    slotId,
    (cropSlot) => ({
      ...cropSlot,
      lastWateredAt: now,
      isWatered: true,
      isThirsty: false,
    }),
    now,
  );

  const growthResult = recalculateCropGrowth({ ...nextState, updatedAt: now }, now);

  return {
    gameState: incrementProgress(growthResult.gameState, { lifetimeWheatWatered: 1 }),
    message: messages.waterSuccess,
    success: true,
  };
}

export function harvestWheat(gameState, slotId, now = new Date().toISOString()) {
  if (!slotId) {
    return { gameState, message: messages.missingSlot, success: false };
  }

  const recalculatedState = recalculateCropGrowth(gameState, now).gameState;
  const slot = recalculatedState.farm.cropSlots.find((cropSlot) => cropSlot.slotId === slotId);

  if (!slot) {
    return { gameState, message: messages.missingSlot, success: false };
  }

  if (slot.status === CROP_SLOT_STATUS.EMPTY || slot.cropType !== CROP_TYPES.WHEAT) {
    return { gameState: recalculatedState, message: messages.noWheatToHarvest, success: false };
  }

  if (
    slot.status !== CROP_SLOT_STATUS.MATURE ||
    slot.isMature !== true ||
    slot.growthProgress !== 100
  ) {
    return { gameState: recalculatedState, message: messages.notReadyToHarvest, success: false };
  }

  const nextState = updateCropSlot(
    {
      ...recalculatedState,
      updatedAt: now,
      inventory: {
        ...recalculatedState.inventory,
        wheat: recalculatedState.inventory.wheat + 1,
      },
    },
    slotId,
    (cropSlot) => ({
      ...cropSlot,
      cropType: null,
      status: CROP_SLOT_STATUS.EMPTY,
      plantedAt: null,
      lastWateredAt: null,
      growthStartedAt: null,
      growthProgress: 0,
      isWatered: false,
      isThirsty: false,
      hasWeed: false,
      isMature: false,
    }),
    now,
  );

  return {
    gameState: incrementProgress(nextState, { lifetimeWheatHarvested: 1 }),
    message: messages.harvestSuccess,
    success: true,
  };
}

export function buyWheatSeed(gameState, now = new Date().toISOString()) {
  if (!canBuyWheatSeed(gameState)) {
    return { gameState, message: messages.noGold, success: false };
  }

  const nextState = {
    ...gameState,
    updatedAt: now,
    inventory: {
      ...gameState.inventory,
      gold: gameState.inventory.gold - WHEAT_SEED_COST,
      wheatSeeds: gameState.inventory.wheatSeeds + 1,
    },
  };

  return {
    gameState: incrementProgress(nextState, {
      lifetimeGoldSpent: WHEAT_SEED_COST,
      lifetimeSeedsBought: 1,
    }),
    message: messages.buySeedSuccess,
    success: true,
  };
}

export function sellWheat(gameState, now = new Date().toISOString()) {
  if (!canSellWheat(gameState)) {
    return { gameState, message: messages.noWheatToSell, success: false };
  }

  const nextState = {
    ...gameState,
    updatedAt: now,
    inventory: {
      ...gameState.inventory,
      gold: gameState.inventory.gold + PAWN_SHOP_WHEAT_SELL_PRICE,
      wheat: gameState.inventory.wheat - 1,
    },
  };

  return {
    gameState: incrementProgress(nextState, {
      lifetimeGoldEarned: PAWN_SHOP_WHEAT_SELL_PRICE,
      lifetimeWheatSold: 1,
    }),
    message: messages.sellWheatSuccess,
    success: true,
  };
}
