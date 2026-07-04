# Road to Long Long Noodles - Version 0.4 Farming Clarity Plan

Status: Version 0.4 begins with a read-only Crop Detail Panel for the existing local farming prototype

Version 0.4 Prompt 1 adds a clearer Farm page Crop Detail Panel. It is UI guidance only and derives display text from existing crop slot and inventory state. It does not add new gameplay systems, rewards, online save, backend, economy changes, or balance changes.

## Included In Version 0.4 Prompt 1

- Read-only `Selected Crop Slot` panel on the Farm page
- Friendly crop status wording derived from existing slot state
- Compact selected-slot details for slot, crop, stage, progress, watered state, and next action
- Growth progress bar for the selected crop slot
- Existing timestamp display for planted, growth-started, and last-watered times
- Help / Manual explanation for the Crop Detail Panel
- README and manual test checklist updates

## Friendly Status Wording

The Crop Detail Panel converts internal crop slot state into player-facing wording:

- Empty slot: `Empty Soil`
- Planted wheat that has not been watered: `Needs Water`
- Watered wheat below `100%`: `Growing`
- Mature wheat: `Ready to Harvest`

The panel may also show `Seed Planted` as a stage label for planted wheat at `0%` growth.

## Next Action Guidance

Next action text is derived from the selected slot and current inventory:

- No selected slot: `Select a soil slot first.`
- Empty slot with wheat seeds: `Plant wheat seed here.`
- Empty slot without wheat seeds: `Buy wheat seeds at the Pawn Shop.`
- Planted unwatered wheat: `Water this wheat to start growth.`
- Watered growing wheat: `Wait until this wheat reaches 100%.`
- Mature wheat: `Harvest this wheat.`

This guidance does not trigger actions by itself. The existing Plant Wheat, Water, and Harvest buttons remain the only Farm page action controls.

## Balance Unchanged

- Starting land: 1
- Crop slots: 16
- Starting wheat seeds: 4
- Starting gold: 0
- Starting wheat: 0
- Wheat seed cost: 100 gold
- Pawn Shop wheat sell price: 110 gold
- Harvest result: 1 wheat
- Harvest does not return seeds
- Dev Fast Growth Mode remains active
- localStorage key remains `roadToLongLongNoodlesSaveV01`

## Explicitly Not Included

- Rewards
- Achievement rewards
- Claim buttons
- XP
- Player levels
- Unlocks
- Noodles
- Soup
- Customers
- Premium
- Payment
- Monetization
- Long Long Coin
- Backend
- Firebase
- Online save
- Account system
- Admin panel
- Notifications
- Tools
- Land expansion
- Wandering Merchant
- Daily login rewards
- Quest rewards
