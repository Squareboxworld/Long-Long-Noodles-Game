# Road to Long Long Noodles - Version 0.6 Art Asset Audit

Status: Version 0.6 Prompt 1 audit, Prompt 2 Farm visual fit, Prompt 3 wheat stage readability pass, and Prompt 4 resource icon/button fit polish.

This document audits the current temporary PNG asset setup before final farm visual replacement. Prompt 2 improves CSS-only Farm background and crop tile fit around these same assets. Prompt 3 improves CSS-only wheat stage readability. Prompt 4 improves CSS/page-level resource icon and button asset fit. It does not activate new gameplay, replace art, rename files, move assets, change balance, or change the localStorage save key.

## Replacement Rule

Same folder + same filename + same `.png` extension = safe replacement.

Final art can usually replace temporary test art by overwriting the existing PNG at the same public path. Keep `src/data/assetManifest.js` asset IDs stable so UI code can keep using the same manifest entries.

## Current Asset Folder Structure

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

Empty folders use `.gitkeep`. Current empty/future folders include `characters/bb`, `characters/longlong`, `ui/panels`, and `placeholders`.

## Manifest And Fallback Summary

- Manifest file: `src/data/assetManifest.js`
- Helper file: `src/utils/assets.js`
- Total manifest IDs: 23
- Missing manifest PNG files: 0
- Extra PNG files outside the manifest: 0
- Current fallback path: empty string

`getAssetPath(assetId)` returns the configured public path only when the manifest entry exists, is marked `available`, and has a path. Unknown, missing, or unavailable IDs return the fallback value. The current fallback is an empty string, so the UI keeps CSS placeholders and avoids requesting unknown image paths. Farm decorative images also hide themselves on broken image load where used.

## Prompt 2 Fit Notes

- No PNG files were modified.
- Farm background fit is handled with CSS sizing, bottom-positioned cover behavior, and bounded scene heights.
- The crop grid remains a 4x4 interaction area and is placed inside the Farm scene with consistent spacing.
- Soil and wheat images are contained inside crop slots with `object-fit: contain` so temporary art does not stretch.
- Crop tile text should stay minimal: slot number, one main status label, and progress percentage when wheat is present.
- Detailed crop information belongs in the `Selected Crop Slot` panel, not on each crop tile.
- Mobile checks should include 360px and 390px widths for horizontal overflow, label fit, selected slot visibility, and tap targets.

## Prompt 3 Wheat Stage Fit Notes

- No PNG files were modified.
- Wheat stage fit is handled through display-only CSS classes on the existing wheat stage images.
- Seed, sprout, small wheat, growing wheat, and mature wheat can each use slightly different contained sizing.
- The current progress-to-stage mapping remains unchanged.
- Mature wheat gets subtle ready-to-harvest label/progress emphasis without flashing or animation.
- Dry wheat art remains future-facing and unused because dry crop logic is not active.
- Final wheat stage art can replace the current PNGs later by using the same filenames.

## Prompt 4 Resource Icon And Button Fit Notes

- No PNG files were modified.
- Resource icon fit is handled through contained CSS sizing in the HUD, Farm summaries, Inventory cards, and Pawn Shop UI.
- Pawn Shop now uses existing manifest icons for current inventory, buy/sell helper rows, offer headings, and buy/sell buttons.
- Farm action button PNGs remain decorative backgrounds; HTML text stays the readable label.
- Final icon and button art can replace the current PNGs later by using the same filenames and manifest IDs.

## Prompt 5 Squarebox Placement Notes

- No PNG files were modified.
- Squarebox remains decorative/helper-only and does not block crop slots or action buttons.
- Welcome uses the idle Squarebox pose as a small helper in the first-time preview.
- Farm uses one Squarebox helper spot in the beginner guide card instead of placing another Squarebox inside the Farm scene.
- Planting, watering, and harvesting Squarebox poses are used as display-only Farm helper images based on the current objective.
- Final Squarebox pose art can replace the current PNGs later by using the same filenames and manifest IDs.

## Current Asset Groups

### Farm Background

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `bg_farm_main` | `/assets/locations/farm/bg_farm_main.png` | 1672 x 941, 1914679 bytes | No | Main Farm scene background | Safe to replace by filename. Should remain a non-transparent scene/background PNG. Keep a wide landscape aspect close to 16:9. Optimize for web size. |

### Soil And Crop Tiles

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `crop_soil_empty` | `/assets/crops/soil/crop_soil_empty.png` | 2216 x 2257, 3490695 bytes | Yes | Empty crop slot base | Farm-critical. Safe to replace by filename. Final art should be transparent PNG or have a clean tile edge that looks acceptable in the crop slot. |
| `crop_soil_tilled` | `/assets/crops/soil/crop_soil_tilled.png` | 2218 x 2257, 3694154 bytes | Yes | Planted crop slot base | Farm-critical. Safe to replace by filename. Final art should align visually with the empty soil tile. |

### Wheat Stages

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `crop_wheat_stage_00_seed` | `/assets/crops/wheat/crop_wheat_stage_00_seed.png` | 3072 x 3072, 352767 bytes | Yes | 0% planted wheat | Farm-critical. Transparent PNG recommended. |
| `crop_wheat_stage_01_sprout` | `/assets/crops/wheat/crop_wheat_stage_01_sprout.png` | 3072 x 3072, 765945 bytes | Yes | 1-25% wheat | Farm-critical. Transparent PNG recommended. |
| `crop_wheat_stage_02_small` | `/assets/crops/wheat/crop_wheat_stage_02_small.png` | 3072 x 3072, 1163434 bytes | Yes | 26-50% wheat | Farm-critical. Transparent PNG recommended. |
| `crop_wheat_stage_03_growing` | `/assets/crops/wheat/crop_wheat_stage_03_growing.png` | 3072 x 3072, 2411720 bytes | Yes | 51-99% wheat | Farm-critical. Transparent PNG recommended. |
| `crop_wheat_stage_04_mature` | `/assets/crops/wheat/crop_wheat_stage_04_mature.png` | 3072 x 3072, 4209334 bytes | Yes | Ready to harvest wheat | Farm-critical. Transparent PNG recommended. |
| `crop_wheat_stage_05_dry` | `/assets/crops/wheat/crop_wheat_stage_05_dry.png` | 3072 x 3072, 2294978 bytes | Yes | Future-facing; dry crop logic is not active | Safe to replace by filename later. Keep transparent. Do not wire it into gameplay until dry crop logic is explicitly requested. |

Current visual mapping:

- Empty slot: `crop_soil_empty`
- Planted but 0%: `crop_wheat_stage_00_seed`
- 1-25%: `crop_wheat_stage_01_sprout`
- 26-50%: `crop_wheat_stage_02_small`
- 51-99%: `crop_wheat_stage_03_growing`
- Ready to harvest: `crop_wheat_stage_04_mature`

### Crop Overlays

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `crop_overlay_thirsty` | `/assets/crops/wheat/crop_overlay_thirsty.png` | 3072 x 3072, 1417636 bytes | Yes | Conditionally wired by slot field, but thirst timer is not active | Future-facing. Transparent PNG required. |
| `crop_overlay_weed` | `/assets/crops/wheat/crop_overlay_weed.png` | 3072 x 3072, 1829307 bytes | Yes | Conditionally wired by slot field, but weed system is not active | Future-facing. Transparent PNG required. |
| `crop_overlay_dry` | `/assets/crops/wheat/crop_overlay_dry.png` | 3072 x 3072, 2472416 bytes | Yes | Manifest only; dry crop system is not active | Future-facing. Transparent PNG required. |

### Resource Icons

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `icon_gold_coin` | `/assets/icons/icon_gold_coin.png` | 3072 x 3072, 3444250 bytes | Yes | HUD, Farm summaries, Inventory summaries, objective cues | Important UI icon. Transparent PNG recommended. |
| `icon_wheat_seed` | `/assets/icons/icon_wheat_seed.png` | 3072 x 3072, 4313731 bytes | Yes | HUD, Farm, Inventory, Plant action, objective cues | Important UI icon. Transparent PNG recommended. |
| `icon_wheat` | `/assets/icons/icon_wheat.png` | 3072 x 3072, 4253973 bytes | Yes | HUD, Farm, Inventory, Harvest action, objective cues | Important UI icon. Transparent PNG recommended. |
| `icon_water_drop` | `/assets/icons/icon_water_drop.png` | 3072 x 3072, 2151150 bytes | Yes | Water action, selected crop detail, objective cues, Inventory farm status | Important UI icon. Transparent PNG recommended. |

### Squarebox

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `character_squarebox_idle` | `/assets/characters/squarebox/character_squarebox_idle.png` | 768 x 768, 223089 bytes | Yes | Welcome helper and default Farm beginner helper pose | Decorative only. Transparent PNG recommended. |
| `character_squarebox_planting` | `/assets/characters/squarebox/character_squarebox_planting.png` | 768 x 768, 241688 bytes | Yes | Display-only Farm beginner helper pose when planting is the current objective | Decorative only. Safe to replace by filename. |
| `character_squarebox_watering` | `/assets/characters/squarebox/character_squarebox_watering.png` | 768 x 768, 231766 bytes | Yes | Display-only Farm beginner helper pose when watering is the current objective | Decorative only. Safe to replace by filename. |
| `character_squarebox_harvesting` | `/assets/characters/squarebox/character_squarebox_harvesting.png` | 768 x 768, 258786 bytes | Yes | Display-only Farm beginner helper pose when harvesting is the current objective | Decorative only. Safe to replace by filename. |

### UI Buttons

| Asset ID | Path | Size | Transparency | Current use | Replacement notes |
| --- | --- | --- | --- | --- | --- |
| `ui_button_plant` | `/assets/ui/buttons/ui_button_plant.png` | 3072 x 3072, 3043058 bytes | Yes | Plant button decorative art | Safe to replace by filename. Transparent PNG recommended. HTML text remains the readable label. |
| `ui_button_water` | `/assets/ui/buttons/ui_button_water.png` | 3072 x 3072, 2521916 bytes | Yes | Water button decorative art | Safe to replace by filename. Transparent PNG recommended. HTML text remains the readable label. |
| `ui_button_harvest` | `/assets/ui/buttons/ui_button_harvest.png` | 3072 x 3072, 3187676 bytes | Yes | Harvest button decorative art | Safe to replace by filename. Transparent PNG recommended. HTML text remains the readable label. |

## Farm-Critical Assets

Farm-critical current visuals:

- `bg_farm_main`
- `crop_soil_empty`
- `crop_soil_tilled`
- `crop_wheat_stage_00_seed`
- `crop_wheat_stage_01_sprout`
- `crop_wheat_stage_02_small`
- `crop_wheat_stage_03_growing`
- `crop_wheat_stage_04_mature`

Important UI assets:

- `icon_gold_coin`
- `icon_wheat_seed`
- `icon_wheat`
- `icon_water_drop`
- `ui_button_plant`
- `ui_button_water`
- `ui_button_harvest`

Decorative current assets:

- `character_squarebox_idle`
- `character_squarebox_planting`
- `character_squarebox_watering`
- `character_squarebox_harvesting`

Future-facing or inactive assets:

- `crop_wheat_stage_05_dry`
- `crop_overlay_thirsty`
- `crop_overlay_weed`
- `crop_overlay_dry`
- Empty folders for `bb`, `longlong`, `ui/panels`, and `placeholders`

## Transparency Requirements

Transparent PNG recommended or required:

- Soil/crop tiles
- Wheat stages
- Crop overlays
- Resource icons
- Squarebox character poses
- UI button decorative art

Non-transparent or full-background PNG acceptable:

- `bg_farm_main`

## Size And Optimization Notes

- Current crop, icon, overlay, and UI button assets are mostly 3072 x 3072 and several files are 2-4 MB each.
- Current soil tiles are about 2200 x 2257 and over 3 MB each.
- Current farm background is 1672 x 941 and about 1.9 MB.
- Final art should be optimized for web delivery. Keep source-quality art elsewhere if needed, but committed runtime PNGs should be as small as practical while staying crisp in the current UI.
- Prefer square transparent art for crop stages/icons/buttons when replacing existing square assets.
- Prefer a wide landscape background for `bg_farm_main`.

## Fallback Behavior

- Unknown or unavailable asset IDs return an empty string through `getAssetPath()`.
- Empty string paths let CSS backgrounds and placeholder layout continue without crashing.
- Farm decorative images call `onError` and hide themselves if an image fails to load.
- Crop slots remain clickable because art layers use layout containment and do not own the gameplay state.
- HTML text remains on top of action button art, so button labels stay readable even if art is missing or imperfect.

## Out Of Scope

This audit does not add or change:

- PNG files
- animation systems
- dry crop logic
- thirst timers
- weed timers
- Squarebox pose switching
- Noodles, soup, customers, premium, payment, monetization, Long Long Coin
- backend, Firebase, account system, online save, admin panel, notifications
- tools, land expansion, Wandering Merchant, events, rewards, XP, levels, or quests
