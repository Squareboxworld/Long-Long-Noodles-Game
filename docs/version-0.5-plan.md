# Road to Long Long Noodles - Version 0.5 UI Shell Plan

Status: Version 0.5 begins with Game HUD / UI Shell Foundation for the existing local farming prototype.

Version 0.5 Prompt 1 makes the app feel more like one coherent cozy farming game without adding new gameplay systems. It improves the top shell, resource summary, navigation presentation, and page heading consistency while keeping all Version 0.4 farming behavior intact.

## Included In Version 0.5 Prompt 1

- Compact game-style top shell
- `Road to Long Long Noodles` title
- `Squarebox Farm` local identity
- `Version 0.5 Prototype` status label
- `Local Prototype` status label
- Dev Fast Growth Mode status label
- Top resource HUD for Gold, Wheat Seeds, and Wheat
- Resource HUD values derived from existing local game state
- Navigation polish for Welcome, Farm, Inventory, Pawn Shop, and Help
- Light page heading spacing consistency
- Mobile wrapping rules for the HUD and navigation
- README, Help / Manual, and manual test checklist updates

## Resource HUD Behavior

The top resource HUD shows only current Version 0.5 resources:

- Gold
- Wheat Seeds
- Wheat

The values come from the existing `gameState.inventory` object. They update naturally when existing actions change inventory:

- Plant wheat: Wheat Seeds decreases
- Harvest wheat: Wheat increases
- Sell wheat: Wheat decreases and Gold increases
- Buy wheat seed: Gold decreases and Wheat Seeds increases
- Reset Dev State: resources return to the local test starting state

No new resources were added.

## Navigation Scope

Version 0.5 keeps only the real current pages:

- Welcome
- Farm
- Inventory
- Pawn Shop
- Help

No unavailable menu buttons were added.

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
- localStorage key remains unchanged
- Current growth duration remains unchanged

## Explicitly Not Included

- Noodles
- Soup
- Customers
- Customer visits
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
- XP rewards
- Player levels with gameplay effects
- Reward claim buttons
- Achievement reward logic
- Daily login rewards
- Quest rewards
- Leaderboard
- Events
- Fake menu buttons for unavailable systems
