import {
  CROP_SLOT_STATUS,
  CROP_TYPES,
  CROP_SLOTS_PER_LAND,
  GAME_VERSION,
  INITIAL_INVENTORY,
  INITIAL_PROGRESS,
  STARTING_LAND_COUNT,
} from './gameConstants.js';

const VALID_CROP_STATUSES = new Set(Object.values(CROP_SLOT_STATUS));
const VALID_CROP_TYPES = new Set(Object.values(CROP_TYPES));

function createCropSlot(landId, slotNumber) {
  const paddedSlotNumber = String(slotNumber).padStart(2, '0');

  return {
    slotId: `${landId}-slot-${paddedSlotNumber}`,
    landId,
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
  };
}

function createLand(landNumber) {
  return {
    landId: `land-${landNumber}`,
    name: landNumber === 1 ? 'Starter Land' : `Land ${landNumber}`,
    slotCount: CROP_SLOTS_PER_LAND,
  };
}

export function createInitialGameState(now = new Date().toISOString()) {
  const lands = Array.from({ length: STARTING_LAND_COUNT }, (_, index) =>
    createLand(index + 1),
  );

  const cropSlots = lands.flatMap((land) =>
    Array.from({ length: land.slotCount }, (_, index) =>
      createCropSlot(land.landId, index + 1),
    ),
  );

  return {
    version: GAME_VERSION,
    createdAt: now,
    updatedAt: now,
    farm: {
      landCount: lands.length,
      cropSlotsPerLand: CROP_SLOTS_PER_LAND,
      lands,
      cropSlots,
    },
    inventory: {
      ...INITIAL_INVENTORY,
    },
    progress: {
      ...INITIAL_PROGRESS,
    },
  };
}

function safeNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

function safeTimestamp(value, fallback = null) {
  return typeof value === 'string' ? value : fallback;
}

function safeBoolean(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeProgress(savedProgress) {
  return Object.fromEntries(
    Object.entries(INITIAL_PROGRESS).map(([key, fallback]) => [
      key,
      Math.max(0, safeNumber(savedProgress?.[key], fallback)),
    ]),
  );
}

function normalizeCropSlot(savedSlot, baseSlot) {
  const cropType = VALID_CROP_TYPES.has(savedSlot?.cropType) ? savedSlot.cropType : null;
  const status = VALID_CROP_STATUSES.has(savedSlot?.status)
    ? savedSlot.status
    : CROP_SLOT_STATUS.EMPTY;

  return {
    ...baseSlot,
    cropType,
    status,
    plantedAt: safeTimestamp(savedSlot?.plantedAt),
    lastWateredAt: safeTimestamp(savedSlot?.lastWateredAt),
    growthStartedAt: safeTimestamp(savedSlot?.growthStartedAt),
    growthProgress: Math.max(0, safeNumber(savedSlot?.growthProgress, 0)),
    isWatered: safeBoolean(savedSlot?.isWatered, false),
    isThirsty: safeBoolean(savedSlot?.isThirsty, false),
    hasWeed: safeBoolean(savedSlot?.hasWeed, false),
    isMature: safeBoolean(savedSlot?.isMature, false),
  };
}

export function normalizeGameState(savedState) {
  const baseState = createInitialGameState();

  if (!savedState || typeof savedState !== 'object') {
    return baseState;
  }

  const savedSlots = Array.isArray(savedState.farm?.cropSlots)
    ? savedState.farm.cropSlots
    : [];

  const cropSlots = baseState.farm.cropSlots.map((baseSlot, index) => {
    const savedSlot =
      savedSlots.find((slot) => slot?.slotId === baseSlot.slotId) ?? savedSlots[index];

    return normalizeCropSlot(savedSlot, baseSlot);
  });

  return {
    ...baseState,
    version: typeof savedState.version === 'string' ? savedState.version : GAME_VERSION,
    createdAt: safeTimestamp(savedState.createdAt, baseState.createdAt),
    updatedAt: safeTimestamp(savedState.updatedAt, baseState.updatedAt),
    farm: {
      ...baseState.farm,
      cropSlots,
    },
    inventory: {
      gold: Math.max(0, safeNumber(savedState.inventory?.gold, INITIAL_INVENTORY.gold)),
      wheatSeeds: Math.max(
        0,
        safeNumber(savedState.inventory?.wheatSeeds, INITIAL_INVENTORY.wheatSeeds),
      ),
      wheat: Math.max(0, safeNumber(savedState.inventory?.wheat, INITIAL_INVENTORY.wheat)),
    },
    progress: normalizeProgress(savedState.progress),
  };
}
