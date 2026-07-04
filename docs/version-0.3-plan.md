# Road to Long Long Noodles - Version 0.3 Progress Data and Statistics Plan

Status: progress data foundation and read-only farm statistics UI for the existing local farming prototype

Version 0.3 Prompt 1 adds safe lifetime progress fields to local game state. Version 0.3 Prompt 2 turns those fields into a clearer read-only Farm Statistics UI on the Inventory page. Version 0.3 Prompt 3 adds read-only Farm Milestones derived from existing progress counters. It does not add rewards, achievements, quests, account system, online save, backend, or new gameplay systems.

## Included In Version 0.3 Prompt 1

- Top-level `progress` object in new game state
- Backward-compatible progress normalization for older localStorage saves
- Progress increments for successful existing farming actions
- Progress increments for successful existing Pawn Shop actions
- Reset Dev State `totalResets` tracking
- Temporary read-only Inventory page `Progress Tracking` panel
- Documentation and manual test checklist updates

## Included In Version 0.3 Prompt 2

- Grouped read-only `Progress Tracking` panel on Inventory
- `Current Farm Status` counts derived from current crop slots
- `Progress Summary` values derived from progress and farm state
- Help / Manual explanation for local-only statistics
- Documentation and manual test checklist updates

## Included In Version 0.3 Prompt 3

- Static Farm Milestone definitions in `src/data/farmMilestones.js`
- Safe milestone display derivation in `src/utils/milestones.js`
- Read-only `Farm Milestones` section on Inventory
- Help / Manual explanation for local-only milestone markers
- Documentation and manual test checklist updates

## Progress Fields

```js
progress: {
  lifetimeWheatPlanted: 0,
  lifetimeWheatWatered: 0,
  lifetimeWheatHarvested: 0,
  lifetimeWheatSold: 0,
  lifetimeSeedsBought: 0,
  lifetimeGoldEarned: 0,
  lifetimeGoldSpent: 0,
  totalResets: 0,
}
```

## Increment Rules

- Plant wheat success: `lifetimeWheatPlanted += 1`
- Water wheat success: `lifetimeWheatWatered += 1`
- Harvest wheat success: `lifetimeWheatHarvested += 1`
- Sell wheat success: `lifetimeWheatSold += 1` and `lifetimeGoldEarned += 110`
- Buy wheat seed success: `lifetimeSeedsBought += 1` and `lifetimeGoldSpent += 100`
- Reset Dev State: resets farm and inventory to the local test starting state and increments `totalResets`
- Invalid actions do not increment progress

## Statistics Display

The Inventory page shows a compact read-only `Progress Tracking` panel grouped by:

### Farming

- Wheat planted
- Wheat watered
- Wheat harvested

### Trading

- Wheat sold
- Seeds bought
- Gold earned
- Gold spent

### Save / Debug

- Reset count

The Inventory page also shows `Current Farm Status`, derived from `farm.cropSlots`:

- Empty slots
- Planted wheat slots
- Unwatered wheat slots
- Growing wheat slots
- Mature wheat slots

The Inventory page also shows `Progress Summary`, derived from existing local state:

- Total wheat cycle actions: wheat planted + wheat watered + wheat harvested
- Net gold from trading: lifetime gold earned - lifetime gold spent
- Current farming capacity: current crop slot count

These sections are only for Version 0.3 local testing and player clarity. They have no rewards, achievement completion, rewarded milestone logic, claim buttons, levels, or gameplay effects.

## Farm Milestones

Farm Milestones are read-only progress markers derived from existing `progress` counters. They are not stored separately in localStorage and they do not change gameplay.

- First Seed: plant 1 wheat seed
- First Watering: water wheat 1 time
- First Harvest: harvest 1 wheat
- First Sale: sell 1 wheat at the Pawn Shop
- Seed Buyer: buy 1 wheat seed from the Pawn Shop
- Small Farmer: harvest 5 wheat in total
- Trading Practice: earn 500 gold from selling wheat

Each milestone displays title, description, current value, target value, progress label, and `Completed` or `In progress` state. There are no rewards, XP, levels, unlocks, claim buttons, or achievement completion logic.

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

- Permanent rewarded progression screen
- Progress rewards
- Achievements
- Achievement completion logic
- Rewarded milestone logic
- XP
- Player levels
- Unlocks
- Quest rewards
- Reward-claim buttons
- Daily login rewards
- Account system
- Online save
- Backend
- Firebase
- Noodles
- Soup
- Customers
- Premium
- Payment
- Monetization
- Long Long Coin
- Admin panel
- Notifications
- Harvest minigame
- Wheat Fragment
- Tools
- Land expansion
- Wandering Merchant
