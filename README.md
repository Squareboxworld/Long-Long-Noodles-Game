# Road to Long Long Noodles

A calm, cute, frontend-only farming prototype about slow progress and daily check-ins.

## Current Status

Version 0.1 is a local frontend-only farming prototype ready for a first full manual test pass. The app has the React + Vite structure, placeholder screens, navigation, asset folders, GitHub-style Help / Manual / FAQ documentation, local React game state, planting, watering, localStorage save/load, timestamp-based wheat growth, basic harvesting, and Pawn Shop buy/sell.

## Run Locally

```bash
npm.cmd install
npm.cmd run dev
```

Then open the local URL shown by Vite.

To verify the production build:

```bash
npm.cmd run build
```

## Pages

- Welcome
- Farm
- Inventory
- Pawn Shop
- Help / Manual / FAQ

## Version 0.1 Loop

The first playable loop is:

Plant wheat -> water wheat -> wait by real timestamp -> harvest wheat -> sell wheat -> buy seeds -> repeat.

The current prototype supports planting wheat, watering wheat, growing watered wheat from real timestamps, harvesting mature wheat, selling wheat for gold, buying wheat seeds, and saving/loading with localStorage.

## Current Starting State

- 1 land
- 16 crop slots
- 4 wheat seeds
- 0 gold
- 0 wheat

The visible `Reset Dev State` button returns the app to this starting state during Version 0.1 testing.

## Current Gameplay

- Select a crop slot on the Farm page.
- Use `Plant Wheat` on an empty slot if wheat seeds are available.
- Use `Water` on planted wheat.
- Watered wheat grows from timestamps and can reach mature status in Dev Fast Growth Mode.
- Use `Harvest` on mature wheat to gain 1 wheat.
- Harvesting does not return seeds.
- Use the Pawn Shop to sell 1 wheat for 110 gold.
- Use the Pawn Shop to buy 1 wheat seed for 100 gold.
- Planting, watering, harvesting, Pawn Shop actions, and reset actions are saved to localStorage under `roadToLongLongNoodlesSaveV01`.

## Growth Mode

- Real design: wheat takes 7 real-life days.
- Version 0.1 testing: Dev Fast Growth Mode is active with a 60-second wheat growth duration.
- Crop progress is recalculated from timestamps, so watered wheat continues progressing after refresh or reopen.

## Help / Manual

The Help page is a GitHub-style tester guide with sections for Getting Started, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Version 0.1 Scope, and Known Exclusions.

## Important Exclusions

The following systems are intentionally not included:

- Noodles
- Soup
- Customers
- Premium
- Payment
- Monetization
- Long Long Coin
- Admin panel
- Login
- Backend
- Firebase
- Real notifications
- Harvest minigame
- Wheat Fragment
- Tools
- Land expansion
- Wandering Merchant
- Final art assets

See [docs/version-0.1-scope.md](docs/version-0.1-scope.md) for the active scope.
