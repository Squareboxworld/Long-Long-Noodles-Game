# Manual Test Checklist

Status: Version 0.2 local manual test checklist

## Setup

- Run `npm.cmd install`.
- Run `npm.cmd run dev`.
- Open the local Vite URL in a browser.
- Run `npm.cmd run build` before finishing the pass.

## Final Version 0.1 Loop Checklist

1. Open app.
2. Enter game.
3. Confirm starting inventory: Gold `0`, Wheat Seeds `4`, Wheat `0`.
4. Select empty crop slot.
5. Plant wheat.
6. Water wheat.
7. Wait for Dev Fast Growth Mode.
8. Confirm wheat becomes mature.
9. Harvest wheat.
10. Confirm wheat inventory increases.
11. Go to Pawn Shop.
12. Sell wheat.
13. Confirm gold increases by `110`.
14. Buy wheat seed.
15. Confirm gold decreases by `100` and seed count increases.
16. Refresh browser.
17. Confirm saved progress remains.
18. Reset Dev State.
19. Confirm starting state returns.

## Version 0.2 Beginner Guidance Checks

- Welcome page explains that this is a cozy farming prototype focused on growing wheat.
- Welcome page shows the basic wheat loop: plant, water, wait, harvest, sell, buy wheat seeds.
- Welcome page has a clear `Start Farming` button that opens Farm.
- Welcome page states that Farm is the recommended first page.
- Farm navigation includes a small main-page cue.
- Farm page shows a `Current Goal` panel.
- Current Goal panel shows a simple visual action cue for the suggested next step.
- At the starting state, Current Goal tells the player to plant wheat seeds in empty soil slots.
- After planting unwatered wheat, Current Goal tells the player to water planted wheat.
- After watering wheat before maturity, Current Goal tells the player to wait for wheat to grow.
- After wheat reaches mature status, Current Goal tells the player to harvest mature wheat.
- After harvesting wheat, Current Goal tells the player to go to the Pawn Shop and sell wheat for gold.
- With enough gold and no wheat seeds, Current Goal tells the player to buy wheat seeds from the Pawn Shop.
- If the local test state has no seeds, no wheat, and not enough gold, Current Goal explains that Reset Dev State can restart the test build.
- Farm page shows the beginner loop guide: plant, water, wait, harvest, sell, buy wheat seeds, repeat.
- Beginner loop guide is explanation only and does not grant rewards or change state.
- Current Goal panel is guidance only and does not grant rewards or change state.
- The new guidance panels fit on mobile without covering crop slots or action buttons.
- Page purpose text is short and clear on Farm, Inventory, Pawn Shop, and Help.

## Version 0.2 Visual Objective Feedback Checks

- At the starting state, empty crop slots show a gentle `Plant here` hint while wheat seeds are available.
- Selected crop slot outline remains stronger than any plant, water, growing, or harvest hint.
- After planting wheat, the planted unwatered slot shows a `Needs water` visual hint.
- After watering wheat, the watered growing slot shows a calm `Growing` visual state without aggressive flashing.
- After wheat reaches maturity, the mature slot shows a clear `Harvest` visual hint.
- With no slot selected, the Farm action helper says to select a soil slot first.
- Selecting an empty slot with seed available visually emphasizes the Plant Wheat button.
- Selecting unwatered wheat visually emphasizes the Water button.
- Selecting mature wheat visually emphasizes the Harvest button.
- Non-useful action buttons stay clickable and readable so friendly error messages still work.
- On the Pawn Shop page, Sell Wheat is visually highlighted when wheat is available.
- On the Pawn Shop page, Buy Wheat Seed is visually highlighted when gold is at least `100`.
- If no Pawn Shop action is ready, the Pawn Shop shows a gentle explanation to harvest wheat first.
- Visual guidance does not change inventory, crop state, prices, growth timing, harvest output, or localStorage behavior.

## Navigation

- `Start Farming` on Welcome opens the Farm page.
- Manual button opens the Help / Manual page.
- Top navigation opens Welcome, Farm, Inventory, Pawn Shop, and Help.
- Active navigation state is visually clear.
- Farm is visually marked as the main page in navigation.

## Screens

- Welcome page shows the game name and enter-game action.
- Welcome page explains the first-time farming loop before the player enters Farm.
- Farm page shows the farm background PNG when available, with CSS fallback if the image is missing.
- Farm page shows land count.
- Farm page shows 16 crop slots.
- Farm page shows every crop slot as `empty` with soil tile art when available.
- Farm page shows inventory summary for gold, wheat seeds, and wheat.
- Farm page shows resource icons for gold, wheat seeds, wheat, and water where available.
- Farm page shows Squarebox idle art as a decorative farm character when available.
- Farm action buttons remain readable while using button PNG art where available.
- Farm page shows `Dev Fast Growth Mode`.
- Farm page shows a Current Goal panel and beginner loop guide.
- Farm page shows visual next-action hints on crop slots and action buttons.
- Inventory page shows Gold `0`, Wheat Seeds `4`, and Wheat `0`.
- Inventory page explains that gold buys wheat seeds.
- Inventory page explains that wheat seeds are planted on empty soil slots.
- Inventory page explains that wheat is sold at the Pawn Shop for gold.
- Pawn Shop page is separate from the Farm page.
- Pawn Shop page shows current gold, wheat seeds, and wheat.
- Pawn Shop page shows wheat seed price `100` gold.
- Pawn Shop page shows wheat sell price `110` gold.
- Pawn Shop page explains that selling 1 wheat gives `110` gold.
- Pawn Shop page explains that buying 1 wheat seed costs `100` gold.
- Pawn Shop page explains that harvesting gives wheat, not seed.
- Pawn Shop page visually highlights available buy/sell actions.
- Help / Manual page uses a readable GitHub-style documentation layout.
- Help / Manual page shows a Version 0.2 guidance status label and last updated text.
- Help / Manual page includes a First-Time Player Path section.

## Gameplay Checks

- The visible `Reset Dev State` button is present.
- Clicking `Reset Dev State` returns the displayed inventory to Gold `0`, Wheat Seeds `4`, and Wheat `0`.
- Select an empty crop slot.
- Click `Plant Wheat`.
- Confirm the selected slot status changes to `planted`.
- Confirm the planted slot shows the wheat seed stage image.
- Confirm Wheat Seeds decreases from `4` to `3`.
- Confirm selected slot details show crop type `wheat`, planted timestamp, and growth started timestamp.
- Click `Water`.
- Confirm selected slot details show Watered `yes` and Last Watered At is set.
- Refresh the browser.
- Confirm planted and watered state persists from localStorage.
- Click `Reset Dev State`.
- Confirm localStorage-backed state returns to 16 empty slots and 4 wheat seeds.
- With no seeds available after planting 4 slots, select another empty slot and click `Plant Wheat`.
- Confirm the friendly message explains that wheat seeds are needed and the Pawn Shop is where seeds are bought.
- Select an empty slot and click `Water`.
- Confirm the friendly message says `Select planted wheat first.`
- Without selecting a valid empty slot, click `Plant Wheat` and confirm the message says `Select an empty soil slot first.` or `Choose an empty soil slot before planting.`
- After planting and watering wheat, confirm growth progress starts increasing.
- Confirm wheat visuals progress from sprout to small to growing as progress increases.
- Wait for the dev fast-growth duration to pass.
- Confirm the watered crop reaches status `mature`, Mature `yes`, and Growth Progress `100%`.
- Confirm mature wheat shows the mature wheat image.
- Confirm selected crop details show Can Harvest `yes`.
- Click `Harvest`.
- Confirm feedback says `You harvested 1 wheat.`
- Confirm Wheat inventory increases by `1`.
- Confirm the crop slot returns to `empty`.
- Refresh the browser.
- Confirm the harvested wheat count and empty crop slot remain saved after refresh.
- Confirm unwatered planted wheat remains at `0%` growth.
- Select an empty slot and click `Harvest`; confirm the message says `There is no wheat here to harvest.`
- Select planted or growing wheat and click `Harvest`; confirm the message says `This wheat is still growing. Wait until it reaches 100%.`

## Pawn Shop Checks

- Harvest at least 1 wheat.
- Open Pawn Shop.
- Click `Sell 1 Wheat`.
- Confirm feedback says `You sold 1 wheat for 110 gold.`
- Confirm Wheat decreases by `1`.
- Confirm Gold increases by `110`.
- Click `Buy 1 Wheat Seed`.
- Confirm feedback says `You bought 1 wheat seed.`
- Confirm Gold decreases by `100`.
- Confirm Wheat Seeds increases by `1`.
- Refresh the browser.
- Confirm the updated Gold, Wheat Seeds, and Wheat values remain saved.
- With no wheat available, click `Sell 1 Wheat`; confirm the message says `You do not have wheat to sell yet. Harvest mature wheat first.`
- With less than 100 gold, click `Buy 1 Wheat Seed`; confirm the message says `You need 100 gold to buy 1 wheat seed. Sell wheat to earn gold.`
- No first tutorial sale bonus, bulk buy/sell, Wandering Merchant, harvest minigame, Wheat Fragment, seed return, thirst timer, dry crop timer, weed timer, land expansion, or tools are active yet.

## Help / Manual Checks

- Open Help from the main navigation.
- Confirm the Help page has section navigation buttons.
- Confirm these sections exist: Getting Started, First-Time Player Path, Version 0.2 Guidance, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Version 0.1 Scope, Known Exclusions.
- Confirm Getting Started lists 1 land, 16 crop slots, 4 wheat seeds, 0 gold, and 0 wheat.
- Confirm First-Time Player Path lists: start on Farm, select empty soil, plant wheat, water wheat, wait, harvest, go to Pawn Shop, sell wheat, buy wheat seeds, return to Farm.
- Confirm First-Time Player Path mentions Dev Fast Growth Mode, temporary art, and Reset Dev State.
- Confirm Version 0.2 Guidance explains beginner loop clarity, Current Goal, Pawn Shop continuation, no seed return, stuck-state reset, and temporary art.
- Confirm Crop Growth explains 7 real-life days, Dev Fast Growth Mode, timestamp progress, and unwatered crops staying at 0%.
- Confirm Pawn Shop explains 100 gold seed cost and 110 gold wheat sell price.
- Confirm FAQ includes questions about website-like visuals, Dev Fast Growth Mode, no seed return, buying seeds, selling wheat, stuck test state, Current Goal, future save transfer, and excluded future systems.
- Confirm Known Exclusions lists Noodles, soup, customers, premium, payment, monetization, Long Long Coin, admin panel, backend, Firebase, notifications, harvest minigame, Wheat Fragment, tools, land expansion, and Wandering Merchant.

## Responsive Checks

- Buttons are easy to tap on a phone-sized viewport.
- Navigation does not overflow on mobile.
- Farm crop slots and crop art remain readable on mobile.
- Farm visual hints do not cover slot content or block taps on mobile.
- Crop progress bars fit inside crop slots on mobile.
- Text does not overlap with farm or shop placeholder elements.
- Pages do not require awkward horizontal scrolling at phone widths.

## Art Integration Checks

- Confirm `src/data/assetManifest.js` marks detected Farm PNG assets as `available`.
- Confirm unknown or missing asset IDs still fall back safely through `getAssetPath()`.
- Confirm no broken-image icon blocks a crop slot, button, resource row, or Squarebox decoration.
- Confirm decorative crop images do not block crop slot clicks or taps.
- Confirm dry wheat art is not used yet because dry crop logic is not active.
- Confirm temporary PNG assets look acceptable even if a file has a solid or imperfect background.
- Confirm soil, wheat, icon, Squarebox, and button images do not stretch outside their containers.
- Confirm action button text remains readable over button art in valid and invalid states.
- Confirm final handmade art can replace the temporary PNG files later using the same filenames without changing gameplay.

## localStorage Safety Checks

- With localStorage empty, the app starts from 1 land, 16 empty slots, 4 wheat seeds, 0 gold, and 0 wheat.
- If the saved data is broken, the app falls back to the starting state instead of crashing.
- Reset Dev State returns React state and saved state to the starting state.
- Mature crop state remains saved after refresh.

## Exclusion Checks

- No Noodles page is present.
- No customer, soup, premium, payment, Long Long Coin, admin, login, backend, Firebase, or notification system is present.
