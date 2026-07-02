import { recalculateCropGrowth } from './gameGrowth.js';
import { createInitialGameState, normalizeGameState } from './gameStateUtils.js';

export const STORAGE_KEY = 'roadToLongLongNoodlesSaveV01';

function getLocalStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  return window.localStorage;
}

export function loadGameState() {
  try {
    const storage = getLocalStorage();

    if (!storage) {
      return createInitialGameState();
    }

    const savedValue = storage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return createInitialGameState();
    }

    const normalizedState = normalizeGameState(JSON.parse(savedValue));
    const growthResult = recalculateCropGrowth(normalizedState);

    if (growthResult.shouldSave) {
      storage.setItem(STORAGE_KEY, JSON.stringify(growthResult.gameState));
    }

    return growthResult.gameState;
  } catch (error) {
    console.warn('Could not load saved game state. Starting fresh.', error);
    return createInitialGameState();
  }
}

export function saveGameState(gameState) {
  try {
    const storage = getLocalStorage();

    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.warn('Could not save game state.', error);
  }
}

export function clearGameState() {
  try {
    const storage = getLocalStorage();

    if (!storage) {
      return;
    }

    storage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Could not clear saved game state.', error);
  }
}
