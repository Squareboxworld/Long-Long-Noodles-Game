import {
  ACTIVE_WHEAT_GROWTH_DURATION_MS,
  CROP_SLOT_STATUS,
  CROP_TYPES,
} from './gameConstants.js';

function parseTimeMs(timestampOrDate) {
  if (timestampOrDate instanceof Date) {
    return timestampOrDate.getTime();
  }

  if (typeof timestampOrDate === 'number') {
    return timestampOrDate;
  }

  if (typeof timestampOrDate === 'string') {
    return Date.parse(timestampOrDate);
  }

  return Number.NaN;
}

function isValidTimestamp(timestampOrDate) {
  return Number.isFinite(parseTimeMs(timestampOrDate));
}

function hasSlotChanged(previousSlot, nextSlot) {
  return (
    previousSlot.status !== nextSlot.status ||
    previousSlot.growthStartedAt !== nextSlot.growthStartedAt ||
    previousSlot.growthProgress !== nextSlot.growthProgress ||
    previousSlot.isWatered !== nextSlot.isWatered ||
    previousSlot.isMature !== nextSlot.isMature
  );
}

export function calculateCropGrowthProgress({
  currentTime = new Date().toISOString(),
  growthStartedAt,
  growthDurationMs = ACTIVE_WHEAT_GROWTH_DURATION_MS,
}) {
  const currentTimeMs = parseTimeMs(currentTime);
  const growthStartedAtMs = parseTimeMs(growthStartedAt);

  if (
    !Number.isFinite(currentTimeMs) ||
    !Number.isFinite(growthStartedAtMs) ||
    growthDurationMs <= 0
  ) {
    return 0;
  }

  const elapsedMs = Math.max(0, currentTimeMs - growthStartedAtMs);
  const rawProgress = (elapsedMs / growthDurationMs) * 100;

  return Math.min(100, Math.round(rawProgress * 10) / 10);
}

export function recalculateCropGrowth(
  gameState,
  currentTime = new Date().toISOString(),
  growthDurationMs = ACTIVE_WHEAT_GROWTH_DURATION_MS,
) {
  const maturedSlotIds = [];
  let changed = false;
  let shouldSave = false;

  const cropSlots = gameState.farm.cropSlots.map((slot) => {
    const canGrow =
      slot.cropType === CROP_TYPES.WHEAT &&
      [CROP_SLOT_STATUS.PLANTED, CROP_SLOT_STATUS.GROWING].includes(slot.status);

    if (!canGrow) {
      return slot;
    }

    const validLastWateredAt = isValidTimestamp(slot.lastWateredAt) ? slot.lastWateredAt : null;
    const hasBeenWatered = Boolean(slot.isWatered || validLastWateredAt);

    if (!hasBeenWatered) {
      const nextSlot = {
        ...slot,
        status: CROP_SLOT_STATUS.PLANTED,
        growthStartedAt: null,
        growthProgress: 0,
        isWatered: false,
        isMature: false,
      };

      if (hasSlotChanged(slot, nextSlot)) {
        changed = true;
        shouldSave = true;
      }

      return nextSlot;
    }

    const activeGrowthStartedAt = isValidTimestamp(slot.growthStartedAt)
      ? slot.growthStartedAt
      : validLastWateredAt;

    if (!activeGrowthStartedAt) {
      const nextSlot = {
        ...slot,
        status: CROP_SLOT_STATUS.PLANTED,
        growthStartedAt: null,
        growthProgress: 0,
        isMature: false,
      };

      if (hasSlotChanged(slot, nextSlot)) {
        changed = true;
        shouldSave = true;
      }

      return nextSlot;
    }

    const growthProgress = calculateCropGrowthProgress({
      currentTime,
      growthStartedAt: activeGrowthStartedAt,
      growthDurationMs,
    });
    const isMature = growthProgress >= 100;
    const nextStatus = isMature
      ? CROP_SLOT_STATUS.MATURE
      : growthProgress > 0
        ? CROP_SLOT_STATUS.GROWING
        : CROP_SLOT_STATUS.PLANTED;
    const nextSlot = {
      ...slot,
      status: nextStatus,
      growthStartedAt: activeGrowthStartedAt,
      isWatered: true,
      growthProgress: isMature ? 100 : growthProgress,
      isMature,
    };

    if (hasSlotChanged(slot, nextSlot)) {
      changed = true;

      if (isMature && !slot.isMature && slot.status !== CROP_SLOT_STATUS.MATURE) {
        maturedSlotIds.push(slot.slotId);
        shouldSave = true;
      }

      if (slot.growthStartedAt !== activeGrowthStartedAt || slot.isWatered !== true) {
        shouldSave = true;
      }
    }

    return nextSlot;
  });

  if (!changed) {
    return {
      changed: false,
      gameState,
      maturedSlotIds,
      shouldSave: false,
    };
  }

  return {
    changed: true,
    gameState: {
      ...gameState,
      updatedAt: currentTime,
      farm: {
        ...gameState.farm,
        cropSlots,
      },
    },
    maturedSlotIds,
    shouldSave,
  };
}
