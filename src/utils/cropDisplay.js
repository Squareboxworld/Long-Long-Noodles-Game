import { CROP_SLOT_STATUS, CROP_TYPES } from '../game/gameConstants.js';

export function isDisplayWheatCrop(slot) {
  return slot?.cropType === CROP_TYPES.WHEAT && slot.status !== CROP_SLOT_STATUS.EMPTY;
}

export function isDisplayReadyToHarvest(slot) {
  return Boolean(
    isDisplayWheatCrop(slot) &&
      (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE || slot.growthProgress >= 100),
  );
}

export function getCropStatusLabel(slot) {
  if (!slot || slot.status === CROP_SLOT_STATUS.EMPTY) {
    return 'Empty Soil';
  }

  if (isDisplayReadyToHarvest(slot)) {
    return 'Ready to Harvest';
  }

  if (isDisplayWheatCrop(slot) && !slot.isWatered) {
    return 'Needs Water';
  }

  if (isDisplayWheatCrop(slot) && slot.isWatered) {
    return 'Growing';
  }

  return 'Seed Planted';
}

export function getCropStageLabel(slot) {
  if (!slot || slot.status === CROP_SLOT_STATUS.EMPTY) {
    return 'Empty Soil';
  }

  if (isDisplayReadyToHarvest(slot)) {
    return 'Mature Wheat';
  }

  if (isDisplayWheatCrop(slot) && slot.growthProgress <= 0) {
    return 'Seed Planted';
  }

  if (isDisplayWheatCrop(slot) && slot.growthProgress <= 25) {
    return 'Sprout';
  }

  if (isDisplayWheatCrop(slot) && slot.growthProgress <= 50) {
    return 'Small Wheat';
  }

  if (isDisplayWheatCrop(slot)) {
    return 'Growing Wheat';
  }

  return 'Seed Planted';
}

export function getCropName(slot) {
  return isDisplayWheatCrop(slot) ? 'Wheat' : 'None';
}
