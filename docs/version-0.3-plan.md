# Road to Long Long Noodles - Version 0.3 Progress Data Plan

Status: progress data foundation for the existing local farming prototype

Version 0.3 Prompt 1 adds safe lifetime progress fields to local game state. It also includes a temporary read-only Inventory page Progress Tracking panel for testing the data foundation. It does not add rewards, achievements, quests, account system, online save, backend, or new gameplay systems.

## Included In Version 0.3 Prompt 1

- Top-level `progress` object in new game state
- Backward-compatible progress normalization for older localStorage saves
- Progress increments for successful existing farming actions
- Progress increments for successful existing Pawn Shop actions
- Reset Dev State `totalResets` tracking
- Temporary read-only Inventory page `Progress Tracking` panel
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

## Temporary Display

The Inventory page shows a compact read-only `Progress Tracking` panel with these fields:

- Wheat planted
- Wheat watered
- Wheat harvested
- Wheat sold
- Seeds bought
- Gold earned
- Gold spent
- Reset count

This panel is only for Version 0.3 local testing. It has no rewards, achievement completion, milestone logic, claim buttons, or gameplay effects.

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

- Permanent progress UI
- Progress rewards
- Achievements
- Quest rewards
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
