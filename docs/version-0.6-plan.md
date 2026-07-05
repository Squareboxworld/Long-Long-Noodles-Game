# Road to Long Long Noodles - Version 0.6 Plan

Status: Final visual foundation QA completed.

Version 0.6 is focused on making the existing temporary art pipeline easier to test and safer to replace later. It does not add gameplay systems, change balance, replace PNG files, or change the localStorage save key.

## Prompt 1: Art Asset Audit

- Audited the current temporary PNG files under `public/assets`.
- Confirmed all 23 manifest asset IDs have matching PNG files.
- Documented farm-critical assets, UI assets, decorative assets, and future-facing inactive assets.
- Documented the safe replacement rule: same folder + same filename + same `.png` extension.
- Left PNG files, gameplay logic, economy values, and save behavior unchanged.

See `docs/version-0.6-art-audit.md` for the detailed asset audit.

## Prompt 2: Farm Background And Crop Tile Fit

- Improved Farm background presentation with CSS so the background fills the scene cleanly and keeps the crop grid readable.
- Kept the crop grid as a clear 4x4 interaction area.
- Tightened crop grid spacing, sizing, and mobile behavior for 360px and 390px widths.
- Improved soil tile and wheat stage image containment so temporary PNG art does not stretch or overflow.
- Kept selected crop slot styling visible without making it overly aggressive.
- Kept crop tile text minimal: slot number, one main status label, and progress percentage when wheat is present.
- Kept detailed crop information in the `Selected Crop Slot` panel.

## Prompt 3: Wheat Stage Visual Fit And Crop Readability

- Added display-only wheat stage classes for seed, sprout, small wheat, growing wheat, and mature wheat.
- Tuned stage image sizing so the current temporary PNGs read more clearly inside crop slots.
- Improved seed and sprout visibility so planted wheat is understandable before and during early growth.
- Kept growing and mature wheat contained so labels remain readable.
- Added subtle ready-to-harvest label/progress emphasis for mature wheat without flashing or animation.
- Left growth thresholds, crop data, economy values, PNG files, and save behavior unchanged.

## Prompt 3B: Farm Scene Layout Overlap Fix

- Changed the Farm scene and Selected Crop Slot/action panel to a safer one-column normal-flow layout.
- The Farm background and 4x4 crop grid now render first as the main visual scene.
- The Selected Crop Slot panel, Plant/Water/Harvest buttons, feedback, and helper text render below the scene.
- Removed the desktop side-column/sticky-panel behavior that could let the Farm scene visually overlap the detail/action area at browser zoom levels.
- Left crop slots, growth behavior, economy values, PNG files, and save behavior unchanged.

## Prompt 3C: Farm Visual Proportion Fix

- Rebalanced the Farm play area after the overlap fix so the scene no longer feels like an oversized wallpaper block.
- Restored a safe desktop two-column layout: compact Farm scene and crop grid on the left, Selected Crop Slot and Farm actions on the right.
- Kept smaller widths stacked so the Farm scene appears first and the detail/action area follows immediately below.
- Reduced Farm scene height, crop grid width, crop tile size, label size, and wheat image scale while keeping the 4x4 grid readable and clickable.
- Simplified Squarebox placement into a small helper decoration without a translucent box, and hid it on crowded phone layouts.
- Left crop slots, growth behavior, economy values, PNG files, and save behavior unchanged.

## Prompt 4: Resource Icon And Button Asset Polish

- Polished HUD, Farm, Inventory, and Pawn Shop resource icon sizing so current temporary PNGs stay contained and aligned with labels and numbers.
- Added existing resource icons to Pawn Shop inventory cards, helper rows, offer headings, and buy/sell buttons without adding new resources or actions.
- Tuned Farm Plant, Water, and Harvest button asset presentation so PNG art stays decorative and HTML text remains the readable label.
- Clarified no-slot Farm wording so the Selected Crop Slot panel and bottom helper say `crop slot` generally and guide players toward ready wheat, planted wheat, or empty soil based on the current goal.
- Left prices, crop rules, growth timing, PNG files, save behavior, and future systems unchanged.

## Prompt 5: Squarebox Farm Character Placement

- Reviewed Squarebox usage across current pages and kept Squarebox decorative/helper-only.
- Added a small idle Squarebox helper to the Welcome preview so the first-time path feels more game-like without crowding the Start Farming action.
- Removed the separate Squarebox character from the Farm scene so it no longer competes with crop slots or the action panel.
- Kept one Farm helper spot in the beginner guide card and uses existing Squarebox planting, watering, and harvesting poses as display-only guidance based on the current objective.
- Left crop rules, action rules, progress counters, prices, PNG files, save behavior, and future systems unchanged.

## Prompt 6: Final Visual QA And Cleanup

- Updated current visible prototype labels from Version 0.5 to Version 0.6 where appropriate.
- Reviewed Welcome, Farm, Inventory, Pawn Shop, and Help for small visual, wording, responsive, and documentation issues.
- Confirmed Version 0.6 remains a visual foundation/art-fit milestone with temporary PNG assets.
- Kept PNG files, gameplay balance, localStorage key, backend/account/online-save scope, and future systems unchanged.

## Replacement Guidance

Future final art should be able to replace current temporary art by using the same public paths and filenames documented in `src/data/assetManifest.js`.

After replacing any PNG, test:

- Farm background fit on desktop and mobile.
- 4x4 crop grid placement.
- Empty soil, seed, sprout, small wheat, growing wheat, and ready-to-harvest wheat states.
- Selected Crop Slot and action buttons near the Farm scene with no overlap.
- Farm scene proportions that keep the background decorative rather than dominant.
- HUD, Inventory, Farm, and Pawn Shop resource icons with consistent contained sizing.
- Farm and Pawn Shop button/icon labels that remain readable when temporary button PNGs are present or unavailable.
- Welcome and Farm Squarebox helper placement, including idle, planting, watering, and harvesting pose replacements.
- Crop slot click/tap behavior.
- Crop label readability.
- No horizontal scrolling at 360px and 390px widths.

## Out Of Scope

Version 0.6 does not add:

- New gameplay systems
- New pages or fake menu buttons
- PNG replacements or generated art
- Noodles, soup, customers, premium, payment, monetization, Long Long Coin
- Backend, Firebase, account system, online save, admin panel, or notifications
- Tools, land expansion, Wandering Merchant, events, rewards, XP, levels, or quests

## Balance

No gameplay balance changed:

- Starting land: 1
- Crop slots: 16
- Starting wheat seeds: 4
- Starting gold: 0
- Wheat seed cost: 100 gold
- Wheat sell price: 110 gold
- Harvest output: 1 wheat
- Dev Fast Growth Mode remains active
- Current growth duration remains unchanged
