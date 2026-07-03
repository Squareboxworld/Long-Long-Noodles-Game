import {
  ASSET_STATUS,
  PLACEHOLDER_ASSET_PATH,
  assetManifest,
} from '../data/assetManifest.js';

export function getAssetEntry(assetId) {
  return assetManifest[assetId] ?? null;
}

export function isAssetAvailable(assetId) {
  return getAssetEntry(assetId)?.status === ASSET_STATUS.AVAILABLE;
}

export function getAssetPath(assetId, fallbackPath = PLACEHOLDER_ASSET_PATH) {
  const asset = getAssetEntry(assetId);

  if (!asset || asset.status !== ASSET_STATUS.AVAILABLE || !asset.path) {
    return fallbackPath;
  }

  return asset.path;
}

export function getPlannedAssetPath(assetId) {
  return getAssetEntry(assetId)?.path ?? PLACEHOLDER_ASSET_PATH;
}
