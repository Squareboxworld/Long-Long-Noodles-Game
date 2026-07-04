import { MAX_ACTIVITY_LOG_ENTRIES } from './gameConstants.js';

function isValidTimestamp(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function createActivityId(type, createdAt) {
  const randomPart =
    globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10);

  return `activity-${Date.parse(createdAt)}-${type}-${randomPart}`;
}

export function normalizeActivityLog(activityLog) {
  if (!Array.isArray(activityLog)) {
    return [];
  }

  return activityLog
    .filter((entry) =>
      entry &&
      typeof entry === 'object' &&
      typeof entry.id === 'string' &&
      typeof entry.type === 'string' &&
      typeof entry.message === 'string' &&
      isValidTimestamp(entry.createdAt),
    )
    .sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt))
    .slice(0, MAX_ACTIVITY_LOG_ENTRIES)
    .map((entry) => ({
      id: entry.id,
      type: entry.type,
      message: entry.message,
      createdAt: entry.createdAt,
      ...(typeof entry.slotId === 'string' ? { slotId: entry.slotId } : {}),
      ...(Number.isFinite(entry.amount) ? { amount: entry.amount } : {}),
    }));
}

export function addActivityLogEntry(gameState, activity, now = new Date().toISOString()) {
  const createdAt = isValidTimestamp(now) ? now : new Date().toISOString();
  const entry = {
    id: createActivityId(activity.type, createdAt),
    type: activity.type,
    message: activity.message,
    createdAt,
    ...(typeof activity.slotId === 'string' ? { slotId: activity.slotId } : {}),
    ...(Number.isFinite(activity.amount) ? { amount: activity.amount } : {}),
  };

  return {
    ...gameState,
    activityLog: normalizeActivityLog([entry, ...(gameState.activityLog ?? [])]),
  };
}
