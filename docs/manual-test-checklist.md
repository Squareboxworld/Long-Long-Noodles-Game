# Manual Test Checklist

Status: final Version 0.1 local manual test checklist

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

## Navigation

- Welcome button opens the Farm page.
- Manual button opens the Help / Manual page.
- Top navigation opens Welcome, Farm, Inventory, Pawn Shop, and Help.
- Active navigation state is visually clear.

## Screens

- Welcome page shows the game name and enter-game action.
- Farm page shows a placeholder farm area.
- Farm page shows land count.
- Farm page shows 16 crop slots.
- Farm page shows every crop slot as `empty`.
- Farm page shows inventory summary for gold, wheat seeds, and wheat.
- Farm page shows `Dev Fast Growth Mode`.
- Inventory page shows Gold `0`, Wheat Seeds `4`, and Wheat `0`.
- Pawn Shop page is separate from the Farm page.
- Pawn Shop page shows current gold, wheat seeds, and wheat.
- Pawn Shop page shows wheat seed price `100` gold.
- Pawn Shop page shows wheat sell price `110` gold.
- Help / Manual page uses a readable GitHub-style documentation layout.
- Help / Manual page shows a Version 0.1 status label and last updated text.

## Gameplay Checks

- The visible `Reset Dev State` button is present.
- Clicking `Reset Dev State` returns the displayed inventory to Gold `0`, Wheat Seeds `4`, and Wheat `0`.
- Select an empty crop slot.
- Click `Plant Wheat`.
- Confirm the selected slot status changes to `planted`.
- Confirm Wheat Seeds decreases from `4` to `3`.
- Confirm selected slot details show crop type `wheat`, planted timestamp, and growth started timestamp.
- Click `Water`.
- Confirm selected slot details show Watered `yes` and Last Watered At is set.
- Refresh the browser.
- Confirm planted and watered state persists from localStorage.
- Click `Reset Dev State`.
- Confirm localStorage-backed state returns to 16 empty slots and 4 wheat seeds.
- With no seeds available after planting 4 slots, select another empty slot and click `Plant Wheat`.
- Confirm the friendly message says `You do not have enough wheat seeds.`
- Select an empty slot and click `Water`.
- Confirm the friendly message says `There is no crop here to water.`
- After planting and watering wheat, confirm growth progress starts increasing.
- Wait for the dev fast-growth duration to pass.
- Confirm the watered crop reaches status `mature`, Mature `yes`, and Growth Progress `100%`.
- Confirm selected crop details show Can Harvest `yes`.
- Click `Harvest`.
- Confirm feedback says `You harvested 1 wheat.`
- Confirm Wheat inventory increases by `1`.
- Confirm the crop slot returns to `empty`.
- Refresh the browser.
- Confirm the harvested wheat count and empty crop slot remain saved after refresh.
- Confirm unwatered planted wheat remains at `0%` growth.
- Select an empty slot and click `Harvest`; confirm the message says `There is no wheat here to harvest.`
- Select planted or growing wheat and click `Harvest`; confirm the message says `This wheat is not ready yet.`

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
- With no wheat available, click `Sell 1 Wheat`; confirm the message says `You do not have wheat to sell.`
- With less than 100 gold, click `Buy 1 Wheat Seed`; confirm the message says `You do not have enough gold.`
- No first tutorial sale bonus, bulk buy/sell, Wandering Merchant, harvest minigame, Wheat Fragment, seed return, thirst timer, dry crop timer, weed timer, land expansion, or tools are active yet.

## Help / Manual Checks

- Open Help from the main navigation.
- Confirm the Help page has section navigation buttons.
- Confirm these sections exist: Getting Started, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Version 0.1 Scope, Known Exclusions.
- Confirm Getting Started lists 1 land, 16 crop slots, 4 wheat seeds, 0 gold, and 0 wheat.
- Confirm Crop Growth explains 7 real-life days, Dev Fast Growth Mode, timestamp progress, and unwatered crops staying at 0%.
- Confirm Pawn Shop explains 100 gold seed cost and 110 gold wheat sell price.
- Confirm FAQ includes questions about website-like visuals, Dev Fast Growth Mode, no seed return, buying seeds, selling wheat, future save transfer, and excluded future systems.
- Confirm Known Exclusions lists Noodles, soup, customers, premium, payment, monetization, Long Long Coin, admin panel, backend, Firebase, notifications, harvest minigame, Wheat Fragment, tools, land expansion, and Wandering Merchant.

## Responsive Checks

- Buttons are easy to tap on a phone-sized viewport.
- Navigation does not overflow on mobile.
- Farm crop slots remain readable on mobile.
- Crop progress bars fit inside crop slots on mobile.
- Text does not overlap with farm or shop placeholder elements.
- Pages do not require awkward horizontal scrolling at phone widths.

## localStorage Safety Checks

- With localStorage empty, the app starts from 1 land, 16 empty slots, 4 wheat seeds, 0 gold, and 0 wheat.
- If the saved data is broken, the app falls back to the starting state instead of crashing.
- Reset Dev State returns React state and saved state to the starting state.
- Mature crop state remains saved after refresh.

## Exclusion Checks

- No Noodles page is present.
- No customer, soup, premium, payment, Long Long Coin, admin, login, backend, Firebase, or notification system is present.
