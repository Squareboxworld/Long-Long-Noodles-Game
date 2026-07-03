export const ASSET_STATUS = Object.freeze({
  AVAILABLE: 'available',
  MISSING: 'missing',
});

export const PLACEHOLDER_ASSET_PATH = '';

function defineAsset(id, path, category, description, status) {
  return Object.freeze({
    id,
    path,
    category,
    description,
    status,
  });
}

function defineAvailableAsset(id, path, category, description) {
  return defineAsset(id, path, category, description, ASSET_STATUS.AVAILABLE);
}

function defineMissingAsset(id, path, category, description) {
  return defineAsset(id, path, category, description, ASSET_STATUS.MISSING);
}

export const assetManifest = Object.freeze({
  bg_farm_main: defineAvailableAsset(
    'bg_farm_main',
    '/assets/locations/farm/bg_farm_main.png',
    'farm/location',
    'Main farm background image.',
  ),

  crop_soil_empty: defineAvailableAsset(
    'crop_soil_empty',
    '/assets/crops/soil/crop_soil_empty.png',
    'soil/crop tile',
    'Empty soil tile.',
  ),
  crop_soil_tilled: defineAvailableAsset(
    'crop_soil_tilled',
    '/assets/crops/soil/crop_soil_tilled.png',
    'soil/crop tile',
    'Tilled soil tile.',
  ),

  crop_wheat_stage_00_seed: defineAvailableAsset(
    'crop_wheat_stage_00_seed',
    '/assets/crops/wheat/crop_wheat_stage_00_seed.png',
    'wheat stage',
    'Wheat seed stage.',
  ),
  crop_wheat_stage_01_sprout: defineAvailableAsset(
    'crop_wheat_stage_01_sprout',
    '/assets/crops/wheat/crop_wheat_stage_01_sprout.png',
    'wheat stage',
    'Wheat sprout stage.',
  ),
  crop_wheat_stage_02_small: defineAvailableAsset(
    'crop_wheat_stage_02_small',
    '/assets/crops/wheat/crop_wheat_stage_02_small.png',
    'wheat stage',
    'Small wheat stage.',
  ),
  crop_wheat_stage_03_growing: defineAvailableAsset(
    'crop_wheat_stage_03_growing',
    '/assets/crops/wheat/crop_wheat_stage_03_growing.png',
    'wheat stage',
    'Growing wheat stage.',
  ),
  crop_wheat_stage_04_mature: defineAvailableAsset(
    'crop_wheat_stage_04_mature',
    '/assets/crops/wheat/crop_wheat_stage_04_mature.png',
    'wheat stage',
    'Mature wheat stage.',
  ),
  crop_wheat_stage_05_dry: defineAvailableAsset(
    'crop_wheat_stage_05_dry',
    '/assets/crops/wheat/crop_wheat_stage_05_dry.png',
    'wheat stage',
    'Dry wheat stage reserved for later crop state art.',
  ),

  crop_overlay_thirsty: defineAvailableAsset(
    'crop_overlay_thirsty',
    '/assets/crops/wheat/crop_overlay_thirsty.png',
    'crop overlay',
    'Thirsty crop overlay reserved for later use.',
  ),
  crop_overlay_weed: defineAvailableAsset(
    'crop_overlay_weed',
    '/assets/crops/wheat/crop_overlay_weed.png',
    'crop overlay',
    'Weed crop overlay reserved for later use.',
  ),
  crop_overlay_dry: defineAvailableAsset(
    'crop_overlay_dry',
    '/assets/crops/wheat/crop_overlay_dry.png',
    'crop overlay',
    'Dry crop overlay reserved for later use.',
  ),

  icon_gold_coin: defineAvailableAsset(
    'icon_gold_coin',
    '/assets/icons/icon_gold_coin.png',
    'resource icon',
    'Gold resource icon.',
  ),
  icon_wheat_seed: defineAvailableAsset(
    'icon_wheat_seed',
    '/assets/icons/icon_wheat_seed.png',
    'resource icon',
    'Wheat seed resource icon.',
  ),
  icon_wheat: defineAvailableAsset(
    'icon_wheat',
    '/assets/icons/icon_wheat.png',
    'resource icon',
    'Wheat resource icon.',
  ),
  icon_water_drop: defineAvailableAsset(
    'icon_water_drop',
    '/assets/icons/icon_water_drop.png',
    'resource icon',
    'Water action icon.',
  ),

  character_squarebox_idle: defineAvailableAsset(
    'character_squarebox_idle',
    '/assets/characters/squarebox/character_squarebox_idle.png',
    'squarebox',
    'Squarebox idle pose.',
  ),
  character_squarebox_planting: defineAvailableAsset(
    'character_squarebox_planting',
    '/assets/characters/squarebox/character_squarebox_planting.png',
    'squarebox',
    'Squarebox planting pose.',
  ),
  character_squarebox_watering: defineAvailableAsset(
    'character_squarebox_watering',
    '/assets/characters/squarebox/character_squarebox_watering.png',
    'squarebox',
    'Squarebox watering pose.',
  ),
  character_squarebox_harvesting: defineAvailableAsset(
    'character_squarebox_harvesting',
    '/assets/characters/squarebox/character_squarebox_harvesting.png',
    'squarebox',
    'Squarebox harvesting pose.',
  ),

  ui_button_plant: defineAvailableAsset(
    'ui_button_plant',
    '/assets/ui/buttons/ui_button_plant.png',
    'ui button',
    'Plant button art.',
  ),
  ui_button_water: defineAvailableAsset(
    'ui_button_water',
    '/assets/ui/buttons/ui_button_water.png',
    'ui button',
    'Water button art.',
  ),
  ui_button_harvest: defineAvailableAsset(
    'ui_button_harvest',
    '/assets/ui/buttons/ui_button_harvest.png',
    'ui button',
    'Harvest button art.',
  ),
});

export const assetIds = Object.freeze(Object.keys(assetManifest));
