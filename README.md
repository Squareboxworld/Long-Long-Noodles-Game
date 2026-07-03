# Road to Long Long Noodles

A calm, cute, frontend-only farming prototype about slow progress and daily check-ins.

## Current Status

Version 0.3 adds progress data and read-only farm statistics UI on top of the stable Version 0.2 local farming prototype. The app has the React + Vite structure, placeholder screens, navigation, asset folders, GitHub-style Help / Manual / FAQ documentation, local React game state, planting, watering, localStorage save/load, timestamp-based wheat growth, basic harvesting, Pawn Shop buy/sell, clearer player guidance, lifetime progress fields, and farm statistics summaries.

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

Plant wheat -> water wheat -> wait by real timestamp -> harvest wheat -> sell wheat -> buy wheat seeds -> repeat.

The current prototype supports planting wheat, watering wheat, growing watered wheat from real timestamps, harvesting mature wheat, selling wheat for gold, buying wheat seeds, and saving/loading with localStorage.

## Current Starting State

- 1 land
- 16 crop slots
- 4 wheat seeds
- 0 gold
- 0 wheat

The visible `Reset Dev State` button returns the app to this starting state during local testing.

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

## Version 0.2 Guidance

Version 0.2 improves beginner clarity only. It adds a Farm page `Current Goal` panel, a simple beginner loop guide, clearer invalid-action feedback, visual next-action highlights, first-time Welcome page flow, Pawn Shop helper text, and Help / Manual updates.

- The objective panel is guidance only and does not grant rewards.
- Crop slot highlights, Current Goal cues, action button emphasis, and Pawn Shop offer highlights are derived from existing state.
- The Welcome page now guides first-time players toward Farm with a `Start Farming` action.
- Page purpose text explains what Farm, Inventory, Pawn Shop, and Help are for.
- The beginner tutorial does not create quests, prizes, or saved tutorial progress.
- Core balance is unchanged: 4 starting wheat seeds, 100 gold seed cost, 110 gold wheat sell price, and 1 wheat per harvest.
- Dev Fast Growth Mode remains active for local testing.

## Version 0.3 Progress Data

Version 0.3 starts a safe progress data foundation. The saved game state now includes a top-level `progress` object for lifetime farming statistics, and the Inventory page shows read-only statistics derived from local state.

- Progress fields are added automatically to older localStorage saves.
- Existing actions increment progress only after successful plant, water, harvest, sell, and buy actions.
- Reset Dev State increments `totalResets` while returning the farm and inventory to the local test starting state.
- The Inventory page includes a grouped read-only `Progress Tracking` panel.
- The Inventory page also shows `Current Farm Status` counts derived from crop slots.
- `Progress Summary` shows derived totals such as total wheat cycle actions, net gold from trading, and current farming capacity.
- No rewards, achievements, quests, account system, online save, or backend were added.

## Growth Mode

- Real design: wheat takes 7 real-life days.
- Local testing: Dev Fast Growth Mode is active with a 60-second wheat growth duration.
- Crop progress is recalculated from timestamps, so watered wheat continues progressing after refresh or reopen.

## Help / Manual

The Help page is a GitHub-style tester guide with sections for Getting Started, First-Time Player Path, Version 0.2 Guidance, Version 0.3 Statistics, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Version 0.1 Scope, and Known Exclusions.

## Art Assets

Art assets are organized through an asset manifest. The Farm page now uses available PNGs for the farm background, soil tiles, wheat stages, resource icons, Squarebox idle art, and action button art. CSS fallback visuals remain in place if an image is missing or broken. See [docs/art-asset-manifest.md](docs/art-asset-manifest.md) for folders, IDs, and current paths.

These PNG assets are temporary test assets for layout and integration. Final handmade art may replace them later by using the same filenames and manifest IDs. Transparency imperfections are acceptable at this stage as long as gameplay remains readable and stable.

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
- Account system
- Backend
- Firebase
- Online save
- Real notifications
- Harvest minigame
- Wheat Fragment
- Tools
- Land expansion
- Wandering Merchant
- Generated final art beyond the provided PNGs

See [docs/version-0.1-scope.md](docs/version-0.1-scope.md) for the farming prototype scope, [docs/version-0.2-plan.md](docs/version-0.2-plan.md) for the beginner guidance pass, and [docs/version-0.3-plan.md](docs/version-0.3-plan.md) for progress data foundation notes.
