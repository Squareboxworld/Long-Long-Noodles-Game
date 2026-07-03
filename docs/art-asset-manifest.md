# Art Asset Manifest

Status: Version 0.1 farm PNG integration active under Version 0.2 guidance polish

The Farm page now uses the PNG assets listed in `src/data/assetManifest.js` where available. The asset manifest keeps stable IDs and public paths so art can be replaced later without changing gameplay logic.

These PNG assets are temporary test assets for layout and integration. Final handmade art may replace them later. Some transparency or background imperfections are acceptable during Version 0.1 as long as the UI remains readable, crop slots remain clickable, and the farming loop remains stable.

Version 0.2 guidance and QA work keeps the same manifest IDs and filenames. Replacing final art later should not require gameplay changes, backend work, account systems, online save, or a localStorage key change.

## Where Assets Go

- `public/assets/characters/squarebox`
- `public/assets/characters/bb`
- `public/assets/characters/longlong`
- `public/assets/crops/wheat`
- `public/assets/crops/soil`
- `public/assets/icons`
- `public/assets/ui/buttons`
- `public/assets/ui/panels`
- `public/assets/locations/farm`
- `public/assets/placeholders`

Empty folders use `.gitkeep` until real PNG files are added.

## Naming Rules

- Use lowercase filenames.
- Use underscores between words.
- Keep category, subject, action, state, and frame number clear.
- Use `.png` for game-ready art.
- Keep IDs in `src/data/assetManifest.js` stable after UI code starts using them.
- To replace art without code changes, keep the same filenames and public paths listed in the manifest.

Examples:

- `character_squarebox_idle.png`
- `character_squarebox_watering.png`
- `crop_wheat_stage_03_growing.png`
- `icon_gold_coin.png`
- `ui_button_plant.png`
- `bg_farm_main.png`

## Helper Behavior

Use `getAssetPath(assetId)` from `src/utils/assets.js` when UI code needs an image path.

- If the asset is marked `available`, it returns the configured public PNG path.
- If the asset is missing or unknown, it returns the fallback value.
- The current fallback is an empty string so the app can keep using CSS placeholders without requesting missing image files.
- Decorative Farm page images hide themselves if a referenced PNG fails to load.
- `getPlannedAssetPath(assetId)` returns the configured PNG path for documentation, tooling, or future art checks.

The Farm page CSS intentionally uses bounded image boxes, `object-fit: contain`, soft overlays, and readable HTML labels. This lets temporary PNGs with solid or imperfect backgrounds remain usable until final transparent art is ready.

## Farm Page Integration

The Farm page currently uses:

- `bg_farm_main` as the farm scene background.
- `crop_soil_empty` and `crop_soil_tilled` as crop tile bases.
- Wheat stage images based on growth progress.
- Resource icons for gold, wheat seeds, wheat, and water.
- `character_squarebox_idle` as a decorative farm character.
- `ui_button_plant`, `ui_button_water`, and `ui_button_harvest` as action button art with readable HTML text overlaid.

Wheat stage mapping:

- Empty slot: `crop_soil_empty`
- Planted at 0%: `crop_wheat_stage_00_seed`
- 1-25%: `crop_wheat_stage_01_sprout`
- 26-50%: `crop_wheat_stage_02_small`
- 51-99%: `crop_wheat_stage_03_growing`
- Mature / 100%: `crop_wheat_stage_04_mature`

Dry wheat art exists in the manifest but is not used yet because dry crop logic is not active in Version 0.1.

## Current Version 0.1 Asset List

| Asset ID | Current Path | Status |
| --- | --- | --- |
| `bg_farm_main` | `/assets/locations/farm/bg_farm_main.png` | Available |
| `crop_soil_empty` | `/assets/crops/soil/crop_soil_empty.png` | Available |
| `crop_soil_tilled` | `/assets/crops/soil/crop_soil_tilled.png` | Available |
| `crop_wheat_stage_00_seed` | `/assets/crops/wheat/crop_wheat_stage_00_seed.png` | Available |
| `crop_wheat_stage_01_sprout` | `/assets/crops/wheat/crop_wheat_stage_01_sprout.png` | Available |
| `crop_wheat_stage_02_small` | `/assets/crops/wheat/crop_wheat_stage_02_small.png` | Available |
| `crop_wheat_stage_03_growing` | `/assets/crops/wheat/crop_wheat_stage_03_growing.png` | Available |
| `crop_wheat_stage_04_mature` | `/assets/crops/wheat/crop_wheat_stage_04_mature.png` | Available |
| `crop_wheat_stage_05_dry` | `/assets/crops/wheat/crop_wheat_stage_05_dry.png` | Available |
| `crop_overlay_thirsty` | `/assets/crops/wheat/crop_overlay_thirsty.png` | Available |
| `crop_overlay_weed` | `/assets/crops/wheat/crop_overlay_weed.png` | Available |
| `crop_overlay_dry` | `/assets/crops/wheat/crop_overlay_dry.png` | Available |
| `icon_gold_coin` | `/assets/icons/icon_gold_coin.png` | Available |
| `icon_wheat_seed` | `/assets/icons/icon_wheat_seed.png` | Available |
| `icon_wheat` | `/assets/icons/icon_wheat.png` | Available |
| `icon_water_drop` | `/assets/icons/icon_water_drop.png` | Available |
| `character_squarebox_idle` | `/assets/characters/squarebox/character_squarebox_idle.png` | Available |
| `character_squarebox_planting` | `/assets/characters/squarebox/character_squarebox_planting.png` | Available |
| `character_squarebox_watering` | `/assets/characters/squarebox/character_squarebox_watering.png` | Available |
| `character_squarebox_harvesting` | `/assets/characters/squarebox/character_squarebox_harvesting.png` | Available |
| `ui_button_plant` | `/assets/ui/buttons/ui_button_plant.png` | Available |
| `ui_button_water` | `/assets/ui/buttons/ui_button_water.png` | Available |
| `ui_button_harvest` | `/assets/ui/buttons/ui_button_harvest.png` | Available |

## Still Missing

No required Version 0.1 asset IDs are missing from the manifest. If an asset is removed later or marked missing again, the Farm page keeps the CSS fallback and remains playable.

## Replacement Guidance

- Replace temporary art by saving the new PNG over the same file path.
- Keep the manifest asset ID unchanged.
- Check the Farm page after replacement at desktop and phone widths.
- If a final asset needs a new filename, update `src/data/assetManifest.js` only; gameplay files should not need changes.
- Art replacement should not change planting, watering, growth, harvest, Pawn Shop, or localStorage behavior.

## Out Of Scope

This document does not activate an animation system, new crop logic, new character behavior, or any future gameplay systems. It only defines the image organization and Farm page image integration.
