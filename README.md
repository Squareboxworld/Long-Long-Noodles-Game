# Road to Long Long Noodles

A calm, cute, frontend-only farming prototype about slow progress and daily check-ins.

## Current Status

Version 0.6 continues art-integration preparation on top of the stable Version 0.5 UI shell. The app has the React + Vite structure, placeholder screens, navigation, asset folders, GitHub-style Help / Manual / FAQ documentation, local React game state, planting, watering, localStorage save/load, timestamp-based wheat growth, basic harvesting, Pawn Shop buy/sell, clearer player guidance, lifetime progress fields, farm statistics summaries, read-only Farm Milestones, Local Save Info, a read-only selected crop detail panel, estimated ready time, friendly crop state wording, Farm UX polish, a local Farm Activity Log, a compact top resource HUD, shared card/panel styling, mobile HUD/navigation refinements, button/feedback polish, final UI shell QA cleanup, a temporary art audit, improved Farm background/crop tile fit, wheat stage readability polish, a compact non-overlapping Farm scene/detail layout, and resource icon/button asset fit polish across the real current pages.

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

## Local Development Shortcut

Normal local dev server:

```bash
npm.cmd run dev
```

Start the local dev server and automatically open the browser:

```bash
npm.cmd run dev:open
```

Windows double-click launcher:

```bash
start-dev-open.bat
```

These shortcuts are for local development only. They do not affect the game, deploy the
website, create a backend, or add online save.

## Pages

- Welcome
- Farm
- Inventory
- Pawn Shop
- Help / Manual / FAQ

## Version 0.1 Loop

The first playable loop is:

Plant wheat -> water wheat -> wait by real timestamp -> harvest wheat -> sell wheat -> buy wheat seeds -> repeat.

The current prototype supports planting wheat, watering wheat to start growth, growing watered wheat from real timestamps, harvesting wheat that is ready to harvest, selling wheat for gold, buying wheat seeds, and saving/loading with localStorage.

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
- Use `Water` on wheat that shows `Needs Water`.
- Watered wheat shows `Growing` and can become `Ready to Harvest` in Dev Fast Growth Mode.
- Use `Harvest` on wheat that is `Ready to Harvest` to gain 1 wheat.
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
- `Farm Milestones` show read-only progress markers derived from existing progress counters.
- `Local Save Info` explains that saves are local browser/device data, not online account data.
- Version 0.3 introduced a prototype status label; the current app shell now shows `Version 0.6 Prototype`.
- Reset Dev State now clearly warns that it restarts this browser's prototype test state and may erase local progress here.
- No rewards, XP, levels, unlocks, achievement logic, quests, account system, online save, or backend were added.

## Version 0.4 Farm Clarity

Version 0.4 starts with Farm page clarity. Selecting a crop slot now shows a compact read-only `Selected Crop Slot` panel with friendly status wording, crop name, progress, watered state, timestamps, estimated ready time, and the next helpful action.

- Empty soil shows `Empty Soil` and planting guidance when wheat seeds are available.
- Wheat that has not been watered shows `Needs Water` and explains that watering starts growth.
- Watered wheat below 100% shows `Growing`.
- Wheat at 100% shows `Ready to Harvest`.
- Watered growing wheat shows a `Ready in` estimate derived from the existing active wheat growth duration.
- Inventory now includes a read-only Farm Activity Log for recent successful farming and Pawn Shop actions.
- Activity entries are local-only, capped to recent entries, and saved through localStorage.
- Crop tiles, the Crop Detail Panel, Current Goal, action hints, Help, and docs use the same friendly crop state wording.
- Farm UX polish keeps the crop grid and farm background as the main visual focus while placing crop details and action buttons nearby on wider screens.
- Mobile Farm layout stacks naturally so crop slots, ready-time text, and action buttons remain readable.
- Selected Crop Slot timing details are tucked into a small expandable section so the next action and ready time stay easy to scan.
- The final Version 0.4 QA pass simplified crop tile labels so each tile shows only the slot number, one main status label, and progress percentage when wheat is present.
- Detailed crop information such as watered state, ready time, next action, and timestamps stays in the `Selected Crop Slot` panel instead of covering the crop art.
- The panel and wording polish are UI guidance only. They do not change gameplay balance, rewards, save keys, crop data, or economy values.

## Version 0.5 Game HUD / UI Shell

Version 0.5 starts by making the existing real pages feel more like one coherent cozy farming game.

- Version 0.5 introduced the app shell with `Road to Long Long Noodles`, `Squarebox Farm`, a prototype version label, `Local Prototype`, and Dev Fast Growth Mode status.
- A compact top resource HUD shows real current values for gold, wheat seeds, and wheat.
- The resource HUD updates from existing local game state when planting, harvesting, selling wheat, and buying wheat seeds.
- Navigation still includes only Welcome, Farm, Inventory, Pawn Shop, and Help.
- Page headings and navigation spacing were lightly polished for a more consistent game shell.
- Shared `game-panel`, `game-card`, and empty-state styling now make Welcome, Farm, Inventory, Pawn Shop, and Help feel more visually connected.
- Inventory statistics, milestones, activity log, Local Save Info, Pawn Shop offers, and Help sections use a softer common panel language.
- Empty-state wording was improved for selected crop details, Farm Milestones, Farm Activity Log, and Pawn Shop guidance.
- Mobile HUD spacing, status labels, resource chips, and navigation buttons were refined for phone-sized screens.
- Active navigation now has a visible `Current` marker in addition to color and `aria-current`.
- The resource bar still shows only real current inventory values: gold, wheat seeds, and wheat.
- Farm, Pawn Shop, navigation, and reset buttons now share clearer interaction styling.
- Farm and Pawn Shop feedback messages now use compact info, success, and warning presentation.
- Unavailable-but-clickable actions are visually softened while still showing friendly error messages when clicked.
- Final UI shell QA tightened mobile HUD sizing, reviewed navigation, shared panels, buttons, feedback, and phone-width layouts.
- The HUD is local-only and does not add accounts, backend, online save, premium currency, XP, levels, rewards, or unavailable pages.
- No gameplay balance, economy values, growth duration, save key, or crop behavior changed.

## Version 0.6 Art Fit

Version 0.6 begins with an audit of the temporary PNG art pipeline before final farm art replacement. Most assets can be replaced later by keeping the same folder, filename, and `.png` extension. See [docs/version-0.6-art-audit.md](docs/version-0.6-art-audit.md) and [docs/version-0.6-plan.md](docs/version-0.6-plan.md).

- Farm background presentation was tightened so the image fills the scene without distorting and keeps the crop grid readable.
- The crop grid stays 4x4, sits intentionally inside the Farm scene, and remains clickable/tappable.
- Soil and wheat images use bounded containment so temporary PNGs are less likely to stretch or overflow.
- Seed, sprout, small wheat, growing wheat, and mature wheat now use display-only stage sizing so each temporary PNG reads more clearly in the crop slot.
- Mature wheat gets subtle ready-to-harvest emphasis while keeping labels readable.
- The Farm scene uses compact desktop proportions with the Selected Crop Slot and action buttons nearby, then stacks safely on mobile.
- The Farm background decorates the scene without becoming an oversized wallpaper block.
- Squarebox is a small decorative helper instead of sitting inside a large translucent box.
- HUD, Farm, Inventory, and Pawn Shop resource icons use consistent contained sizing so temporary PNGs do not crowd labels or numbers.
- Farm action button art stays decorative while HTML text remains the readable button label.
- Selected Crop Slot and bottom helper guidance now say `crop slot` generally and point players toward ready wheat, planted wheat, or empty soil when that is the useful next step.
- Squarebox is used as a small decorative/helper character on Welcome and in the Farm beginner guide, with display-only Farm helper poses for planting, watering, and harvesting guidance.
- Crop tile text stays minimal: slot number, one status label, and progress percentage when wheat is present.
- Detailed crop information remains in the `Selected Crop Slot` panel.
- Final Version 0.6 visual QA completed the visual foundation pass across Welcome, Farm, Inventory, Pawn Shop, and Help.
- PNG assets remain temporary and were not modified for this fit pass. Final art can still replace the same filenames later.
- No gameplay balance, backend/account/online save, or future systems were added.

## Growth Mode

- Real design: wheat takes 7 real-life days.
- Local testing: Dev Fast Growth Mode is active with a 60-second wheat growth duration.
- Crop progress starts after the first successful watering and is recalculated from timestamps, so watered wheat continues progressing after refresh or reopen.
- Estimated ready time uses the same active wheat growth duration and does not change growth speed.
- Version 0.3 final QA fixed the growth-start timing bug where late-watered wheat could jump forward from planting time.

## Help / Manual

The Help page is a GitHub-style tester guide with sections for Getting Started, First-Time Player Path, Version 0.2 Guidance, Version 0.3 Statistics, Version 0.3 Milestones, Version 0.4 Crop Detail, Version 0.4 Activity Log, Version 0.4 Farm UX, Version 0.5 HUD, Version 0.5 Page Cards, Version 0.5 Mobile HUD, Version 0.5 Feedback, Version 0.6 Visual Foundation, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Version 0.1 Scope, and Known Exclusions.

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
- Achievements
- XP
- Player levels
- Unlocks
- Quest rewards
- Reward-claim buttons
- Harvest minigame
- Wheat Fragment
- Tools
- Land expansion
- Wandering Merchant
- Generated final art beyond the provided PNGs

See [docs/version-0.1-scope.md](docs/version-0.1-scope.md) for the farming prototype scope, [docs/version-0.2-plan.md](docs/version-0.2-plan.md) for the beginner guidance pass, [docs/version-0.3-plan.md](docs/version-0.3-plan.md) for progress data foundation notes, [docs/version-0.4-plan.md](docs/version-0.4-plan.md) for Farm clarity notes, and [docs/version-0.5-plan.md](docs/version-0.5-plan.md) for HUD / UI shell notes.
