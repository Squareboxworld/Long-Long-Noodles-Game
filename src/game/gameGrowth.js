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

function hasSlotChanged(previousSlot, nextSlot) {
  return (
    previousSlot.status !== nextSlot.status ||
    previousSlot.growthProgress !== nextSlot.growthProgress ||
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

  const cropSlots = gameState.farm.cropSlots.map((slot) => {
    const canGrow =
      slot.cropType === CROP_TYPES.WHEAT &&
      [CROP_SLOT_STATUS.PLANTED, CROP_SLOT_STATUS.GROWING].includes(slot.status);

    if (!canGrow) {
      return slot;
    }

    const hasBeenWatered = Boolean(slot.isWatered || slot.lastWateredAt);

    if (!hasBeenWatered) {
      const nextSlot = {
        ...slot,
        status: CROP_SLOT_STATUS.PLANTED,
        growthProgress: 0,
        isMature: false,
      };

      if (hasSlotChanged(slot, nextSlot)) {
        changed = true;
      }

      return nextSlot;
    }

    const growthProgress = calculateCropGrowthProgress({
      currentTime,
      growthStartedAt: slot.growthStartedAt ?? slot.plantedAt,
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
      growthProgress: isMature ? 100 : growthProgress,
      isMature,
    };

    if (hasSlotChanged(slot, nextSlot)) {
      changed = true;

      if (isMature && !slot.isMature && slot.status !== CROP_SLOT_STATUS.MATURE) {
        maturedSlotIds.push(slot.slotId);
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
    shouldSave: maturedSlotIds.length > 0,
  };
}
