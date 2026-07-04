# Road to Long Long Noodles - Version 0.4 Farming Clarity Plan

Status: Version 0.4 adds read-only Crop Detail Panel clarity, estimated ready time, a local Farm Activity Log, and consistent crop state wording for the existing local farming prototype

Version 0.4 Prompt 1 adds a clearer Farm page Crop Detail Panel. Version 0.4 Prompt 2 adds estimated ready time text for selected wheat crops. Version 0.4 Prompt 3 adds a capped local Farm Activity Log for recent successful actions. Version 0.4 Prompt 4 standardizes player-facing crop wording across the Farm page, Inventory, Pawn Shop, Help, and documentation. These features are clarity/history only and derive from existing crop slot, inventory, action, and growth timing state. They do not add new gameplay systems, rewards, online save, backend, economy changes, or balance changes.

## Included In Version 0.4 Prompt 1

- Read-only `Selected Crop Slot` panel on the Farm page
- Friendly crop status wording derived from existing slot state
- Compact selected-slot details for slot, crop, stage, progress, watered state, and next action
- Growth progress bar for the selected crop slot
- Friendly timestamp display for planted, growth started, and last watered times
- Help / Manual explanation for the Crop Detail Panel
- README and manual test checklist updates

## Included In Version 0.4 Prompt 4

- Friendly crop state wording polish across Farm, Inventory, Pawn Shop, Help, and docs
- Crop tile status labels now use player-facing wording instead of raw internal slot status
- Shared display-only crop wording helper in `src/utils/cropDisplay.js`
- Current Goal, action hints, ready-time text, and farm notes use the same terms
- No gameplay logic, balance, save key, or economy values were changed

## Included In Version 0.4 Prompt 2

- Estimated ready time display in the `Selected Crop Slot` panel
- `Ready in` countdown for watered wheat based on the existing active wheat growth duration
- Friendly ready-time instructions for no selection, Empty Soil, and wheat that needs water
- Ready to Harvest ready-time text that says it is ready now
- Shared UI time formatting helper in `src/utils/timeFormat.js`
- Help / Manual explanation for estimated ready time
- README and manual test checklist updates

## Included In Version 0.4 Prompt 3

- Top-level `activityLog` array in local game state
- Backward-compatible activity log normalization for older localStorage saves
- Capped recent local activity entries with `id`, `type`, `message`, and `createdAt`
- Successful action logging for planting, watering, harvesting, selling wheat, buying wheat seeds, and reset
- Compact read-only `Farm Activity Log` panel on Inventory
- Friendly relative activity time display such as `just now` or `2 minutes ago`
- Help / Manual explanation for local-only activity history
- README and manual test checklist updates

## Friendly Status Wording

The UI converts internal crop slot state into player-facing wording:

- Empty slot: `Empty Soil`
- Wheat that has not been watered: `Needs Water`
- Watered wheat below `100%`: `Growing`
- Wheat at `100%`: `Ready to Harvest`

The Crop Detail Panel may also show supporting stage labels such as `Seed Planted`, `Sprout`, `Small Wheat`, `Growing Wheat`, and `Mature Wheat`.

## Next Action Guidance

Next action text is derived from the selected slot and current inventory:

- No selected slot: `Select a soil slot first.`
- Empty slot with wheat seeds: `Plant wheat seed here.`
- Empty slot without wheat seeds: `Buy wheat seeds at the Pawn Shop.`
- Wheat that needs water: `Water this wheat to start growth.`
- Watered growing wheat: `Wait until this wheat reaches 100%.`
- Wheat that is ready to harvest: `Harvest this wheat.`

This guidance does not trigger actions by itself. The existing Plant Wheat, Water, and Harvest buttons remain the only Farm page action controls.

## Estimated Ready Time

Estimated ready time is derived from the selected crop slot's `growthStartedAt` timestamp and the existing `ACTIVE_WHEAT_GROWTH_DURATION_MS` constant used by the growth system.

- No selected slot: `Ready time: Select a soil slot first.`
- Empty slot: `Ready time: Plant wheat seed first.`
- Wheat that needs water: `Ready time: Water this wheat to start growth.`
- Watered growing wheat: `Ready in: ...`
- Wheat that is ready to harvest: `Ready now. Harvest this wheat.`
- Missing or invalid timing data: `Ready time: Unknown`

The estimate updates through the existing Farm page growth recalculation interval. It does not change the growth duration or create a new timer system.

## Farm Activity Log

The Farm Activity Log is a local-only recent history list stored inside the existing localStorage save.

Each entry has:

```js
{
  id: 'activity-id',
  type: 'plant',
  message: 'Planted wheat seed in Slot 1.',
  createdAt: '2026-07-04T00:00:00.000Z',
  slotId: 'land-1-slot-01',
  amount: 1,
}
```

Only `id`, `type`, `message`, and `createdAt` are required. `slotId` and `amount` are optional.

The log is capped at 20 entries. New entries are kept newest first, and older entries are dropped after the cap. Old saves without `activityLog` normalize to an empty array. Malformed activity data is ignored.

Successful actions record activity:

- Plant wheat: `Planted wheat seed in Slot X.`
- Water wheat: `Watered wheat in Slot X.`
- Harvest wheat: `Harvested 1 wheat from Slot X.`
- Sell wheat: `Sold 1 wheat for 110 gold.`
- Buy wheat seed: `Bought 1 wheat seed for 100 gold.`
- Reset Dev State: `Reset Dev State.`

Failed actions do not record activity. Reset Dev State clears the previous log as part of resetting the prototype test state, then starts the fresh state with one reset entry.

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
