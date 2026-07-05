# Manual Test Checklist

Status: Version 0.5 local manual test checklist

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
8. Confirm wheat becomes `Ready to Harvest`.
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
- After planting wheat that needs water, Current Goal tells the player to water wheat.
- After watering wheat before it is ready to harvest, Current Goal tells the player to wait for wheat to grow.
- After wheat reaches `Ready to Harvest`, Current Goal tells the player to harvest wheat.
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
- After planting wheat, the slot shows a `Needs Water` visual hint.
- After watering wheat, the watered growing slot shows a calm `Growing` visual state without aggressive flashing.
- After wheat reaches `Ready to Harvest`, the slot shows a clear `Harvest` visual hint.
- With no slot selected, the Farm action helper says to select a soil slot first.
- Selecting an empty slot with seed available visually emphasizes the Plant Wheat button.
- Selecting wheat that needs water visually emphasizes the Water button.
- Selecting wheat that is ready to harvest visually emphasizes the Harvest button.
- Non-useful action buttons stay clickable and readable so friendly error messages still work.
- On the Pawn Shop page, Sell Wheat is visually highlighted when wheat is available.
- On the Pawn Shop page, Buy Wheat Seed is visually highlighted when gold is at least `100`.
- If no Pawn Shop action is ready, the Pawn Shop shows a gentle explanation to harvest wheat first.
- Visual guidance does not change inventory, crop state, prices, growth timing, harvest output, or localStorage behavior.

## Version 0.3 Progress Data Checks

- New game state includes a top-level `progress` object.
- Existing localStorage saves without `progress` load safely and receive default progress values.
- Successful `Plant Wheat` increments `progress.lifetimeWheatPlanted`.
- Successful `Water` increments `progress.lifetimeWheatWatered`.
- Successful `Harvest` increments `progress.lifetimeWheatHarvested`.
- Successful `Sell 1 Wheat` increments `progress.lifetimeWheatSold` and `progress.lifetimeGoldEarned`.
- Successful `Buy 1 Wheat Seed` increments `progress.lifetimeSeedsBought` and `progress.lifetimeGoldSpent`.
- Invalid actions do not increment progress fields.
- Reset Dev State returns farm and inventory to the test starting state and increments `progress.totalResets`.
- Inventory page shows a grouped read-only `Progress Tracking` panel.
- Progress Tracking groups stats into Farming, Trading, and Save / Debug.
- Farming shows wheat planted, wheat watered, and wheat harvested.
- Trading shows wheat sold, seeds bought, gold earned, and gold spent.
- Save / Debug shows reset count.
- Inventory page shows `Current Farm Status`.
- Current Farm Status shows Empty Soil, wheat in soil, Needs Water, Growing, and Ready to Harvest counts.
- Current Farm Status values are derived from current crop slots and are not stored separately.
- Inventory page shows `Progress Summary`.
- Progress Summary shows total wheat cycle actions, net gold from trading, and current farming capacity.
- Progress Tracking, Current Farm Status, and Progress Summary do not include rewards, achievements, quests, claim buttons, backend, account system, or online save.
- Inventory page shows `Farm Milestones`.
- Farm Milestones are derived from existing progress counters and are not stored separately.
- Farm Milestones show `Completed` or `In progress`.
- Farm Milestones show progress labels such as `0 / 1` or `1 / 5`.
- Farm Milestones do not include rewards, XP, levels, unlocks, achievement logic, quests, claim buttons, backend, account system, or online save.
- Inventory page shows `Local Save Info`.
- Local Save Info shows save type, save location, online account status, backend status, Version 0.5 local prototype, Dev Fast Growth Mode, Created, and Last saved.
- Local Save Info date values show `Unknown` if a timestamp is missing or invalid.
- Local Save Info explains that clearing browser data or using another device may remove or hide this local save.
- App header shows a small `Version 0.5 Prototype` label.
- Reset Dev State text explains that reset is mainly for development/testing and restarts this browser's prototype test state.
- Reset Dev State confirmation explains that it may erase local progress in this browser and does not affect an online account because no online account exists.
- Wheat growth starts after the first successful watering, not when the wheat is planted.

## Version 0.4 Crop Detail Panel Checks

- Farm page shows a `Selected Crop Slot` panel.
- With no slot selected, the panel says `Select a soil slot to see details.`
- With no slot selected, the panel shows general `crop slot` guidance or current-goal guidance such as selecting ready wheat, planted wheat, or empty soil.
- Selecting an empty slot shows Status `Empty Soil`, Crop `None`, Progress `0%`, Watered `No`, Next action `Plant wheat seed here.`, and `Ready time: Plant wheat seed first.` when wheat seeds are available.
- Selecting an empty slot with no wheat seeds shows Next action `Buy wheat seeds at the Pawn Shop.`
- Selecting wheat that needs water shows Status `Needs Water`, Stage `Seed Planted`, Progress `0%`, Watered `No`, Next action `Water this wheat to start growth.`, and `Ready time: Water this wheat to start growth.`
- Selecting watered wheat below `100%` shows Status `Growing`, Watered `Yes`, Next action `Wait until this wheat reaches 100%.`, and a `Ready in:` countdown.
- Confirm the `Ready in:` countdown updates while the crop grows.
- Selecting wheat that is ready to harvest shows Status `Ready to Harvest`, Stage `Mature Wheat`, Progress `100%`, Next action `Harvest this wheat.`, and `Ready now. Harvest this wheat.`
- The Crop Detail Panel is read-only guidance and does not grant rewards, create quests, or change gameplay state.
- The Crop Detail Panel does not cover crop slots or block crop slot clicks.
- The Crop Detail Panel stacks cleanly on phone-sized viewports without horizontal scrolling.
- Estimated Ready Time is derived from existing growth timing and does not change growth speed.
- Crop tiles show only the slot number, one main status label, and a progress percentage when wheat is present.
- Crop tiles do not show separate `Watered`, `Harvest`, duplicate `Growing`, or next-action text chips.
- Watered state, next action, ready time, timestamps, and detailed progress remain available in the Selected Crop Slot panel.
- Crop tile labels are compact, readable, and do not cover most of the crop art on desktop or mobile.

## Version 0.4 Farm Activity Log Checks

- Clean saves start with an empty `activityLog` array.
- Older localStorage saves without `activityLog` load safely and show an empty Farm Activity Log.
- Inventory page shows a read-only `Farm Activity Log` panel.
- With no activity, the panel says `Your recent farm actions will appear here.`
- Successful `Plant Wheat` records `Planted wheat seed in Slot X.`
- Successful `Water` records `Watered wheat in Slot X.`
- Successful `Harvest` records `Harvested 1 wheat from Slot X.`
- Successful `Sell 1 Wheat` records `Sold 1 wheat for 110 gold.`
- Successful `Buy 1 Wheat Seed` records `Bought 1 wheat seed for 100 gold.`
- Failed action clicks do not create activity entries.
- Activity Log shows newest activity first.
- Activity Log persists after refresh because it is saved in localStorage.
- Activity Log is capped at 20 entries.
- Reset Dev State clears the previous log and starts the fresh test state with `Reset Dev State.`
- Activity Log is local-only and does not add rewards, quests, notifications, backend, account history, or online save.

## Version 0.5 HUD / UI Shell Checks

- App shell shows `Road to Long Long Noodles`.
- App shell shows `Squarebox Farm`.
- App shell shows `Version 0.5 Prototype`.
- App shell shows `Local Prototype`.
- App shell shows Dev Fast Growth Mode status.
- Top resource HUD shows Gold, Wheat Seeds, and Wheat.
- Top resource HUD values match the current local game state.
- Planting wheat decreases the Wheat Seeds value in the top HUD.
- Harvesting wheat increases the Wheat value in the top HUD.
- Selling wheat increases Gold and decreases Wheat in the top HUD.
- Buying wheat seed decreases Gold and increases Wheat Seeds in the top HUD.
- Top navigation still includes only Welcome, Farm, Inventory, Pawn Shop, and Help.
- Farm remains visually marked as the main page.
- Current page navigation state is visually clear.
- No fake Noodles, Quest, Event, Map, Leaderboard, premium, account, backend, or online-save buttons appear.
- HUD and navigation wrap cleanly on phone-sized viewports without horizontal scrolling.

## Version 0.5 Shared Card / Panel Styling Checks

- Welcome page intro and first-time path use cohesive soft game-panel styling.
- Farm page Current Goal, beginner loop, farm state cards, and Selected Crop Slot panel feel visually related.
- Inventory page resource cards, Local Save Info, Progress Tracking, Current Farm Status, Progress Summary, Farm Milestones, and Farm Activity Log use consistent spacing and card styling.
- Pawn Shop inventory, helper panel, action guidance, and buy/sell cards use consistent game-like panels.
- Help / Manual sections remain readable and use consistent documentation panel styling.
- Empty selected crop detail state tells the player to select a crop slot.
- Empty Farm Activity Log explains that successful Farm and Pawn Shop actions will appear there.
- With zero completed milestones, Farm Milestones explains that planting and watering will start filling milestones in.
- Pawn Shop unavailable-action guidance still explains to harvest wheat first.
- Shared panel polish does not add pages, rewards, quests, XP, levels, backend, account, online save, or future systems.
- Shared panel polish does not change inventory values, prices, growth timing, harvest output, save key, or crop behavior.
- Shared panels and cards stack cleanly on phone-sized viewports without horizontal scrolling.

## Version 0.5 Mobile HUD / Navigation Checks

- Phone-width HUD shows the title without crowding the resource bar.
- `Version 0.5 Prototype`, `Local Prototype`, and Dev Fast Growth Mode labels fit without horizontal scrolling.
- Resource HUD shows only Gold, Wheat Seeds, and Wheat.
- Resource chips remain readable and aligned on phone-sized screens.
- Reset Dev State helper text is short and does not dominate the header.
- Navigation still includes only Welcome, Farm, Inventory, Pawn Shop, and Help.
- Navigation buttons remain tappable on phone-sized screens.
- Active navigation is visible through more than color, including the `Current` marker.
- Farm can still show the `Main` badge without confusing the current page state.
- Focus state remains visible on navigation and action buttons.
- Mobile HUD and navigation refinements do not add pages, resources, accounts, backend, rewards, or future systems.
- Mobile HUD and navigation refinements do not change inventory values, prices, growth timing, harvest output, save key, or crop behavior.

## Version 0.5 Button / Interaction Feedback Checks

- Welcome `Start Farming` and `Read Help` buttons remain easy to tap and readable.
- Farm Plant, Water, and Harvest buttons share consistent button styling.
- The suggested Farm action remains visually clear without aggressive flashing.
- Unavailable Farm actions are visually softened but still clickable for friendly guidance messages.
- Successful Farm actions show compact success feedback.
- Failed Farm actions show compact warning feedback.
- Pawn Shop Sell and Buy buttons share consistent button styling.
- Available Pawn Shop offers remain highlighted without being noisy.
- Unavailable Pawn Shop offers look inactive but not broken.
- Successful Pawn Shop actions show compact success feedback.
- Failed Pawn Shop actions show compact warning feedback.
- Reset Dev State visually reads as a development/testing reset action.
- Reset Dev State still uses browser confirmation behavior.
- Button focus states remain visible.
- Button and feedback polish does not add actions, rewards, quests, backend, account, online save, or future systems.
- Button and feedback polish does not change inventory values, prices, growth timing, harvest output, save key, or crop behavior.

## Version 0.5 Final UI Shell QA Checks

- HUD title, `Version 0.5 Prototype`, `Local Prototype`, and Dev Fast Growth Mode labels remain readable.
- Resource HUD shows only Gold, Wheat Seeds, and Wheat.
- Mobile HUD stacks without desktop flex-basis spacing at 360px and 390px widths.
- Navigation still shows only Welcome, Farm, Inventory, Pawn Shop, and Help.
- Active navigation remains visible through color, shape, `Current` text, and `aria-current`.
- Shared panels and cards remain consistent across Welcome, Farm, Inventory, Pawn Shop, and Help.
- Farm Plant, Water, and Harvest buttons remain tappable and show friendly failed-action feedback.
- Pawn Shop Sell and Buy buttons remain tappable and show friendly failed-action feedback.
- Reset Dev State remains visually distinct as a development/testing reset action.
- Phone-width layouts have no horizontal scrolling.
- Full loop regression still passes: plant, water, grow, harvest, sell wheat, buy wheat seed, refresh, and load.
- Inventory statistics, Farm Milestones, and Farm Activity Log still update from successful actions only.
- Final UI shell QA does not add actions, pages, rewards, quests, backend, account, online save, or future systems.
- Final UI shell QA does not change inventory values, prices, growth timing, harvest output, save key, or crop behavior.

## Version 0.6 Art Fit Checks

- Confirm all temporary Farm PNG files remain in place and no PNG files were edited, renamed, moved, or replaced.
- Confirm the Farm background fills the scene without visible distortion and keeps the crop grid readable.
- Confirm the crop grid remains exactly 4x4 with 16 clickable crop slots.
- Confirm the crop grid sits intentionally inside the Farm scene and does not overflow the scene.
- Confirm empty soil, planted wheat, growing wheat, and ready-to-harvest wheat images use contained sizing and do not stretch.
- Confirm newly planted 0% wheat shows the seed stage clearly.
- Confirm unwatered planted wheat remains at `0%` and still looks planted.
- Confirm early sprout wheat is visible during low progress.
- Confirm small wheat and growing wheat are readable without overflowing the crop slot.
- Confirm mature wheat is visually different from growing wheat and clearly ready to harvest.
- Confirm mature wheat emphasis stays subtle and does not use flashing or aggressive animation.
- Confirm crop tile labels stay minimal: slot number, one main status label, and progress percentage only when wheat is present.
- Confirm detailed crop information still appears in the Selected Crop Slot panel instead of being added back to crop tiles.
- Confirm the selected crop slot outline is visible but does not cover too much crop art.
- Confirm the Farm scene and crop grid do not overlap or cover the Selected Crop Slot panel.
- Confirm desktop Farm scene proportions feel compact instead of like a huge wallpaper block.
- Confirm the Selected Crop Slot panel and Plant, Water, Harvest action buttons are near the Farm scene and fully readable.
- Confirm Squarebox appears as a small helper decoration without a large translucent box on desktop.
- Confirm desktop 100% zoom has no Farm scene/detail panel overlap.
- Confirm desktop 80% zoom has no Farm scene/detail panel overlap.
- Confirm Squarebox decoration and Farm background do not block crop slot clicks or taps.
- Confirm 360px and 390px mobile widths have no horizontal scrolling.
- Confirm crop labels fit and crop art remains visible at 360px and 390px widths.
- Confirm Plant, Water, and Harvest action buttons remain tappable below or near the Farm scene on mobile.
- Confirm HUD resource icons for Gold, Wheat Seeds, and Wheat align with numbers without making chips too tall.
- Confirm Farm resource summary icons for Gold, Wheat Seeds, and Wheat remain contained and readable.
- Confirm Inventory resource cards show balanced icon badges, prominent numbers, and clean mobile stacking.
- Confirm Pawn Shop inventory cards, helper rows, offer headings, and buy/sell buttons use contained resource/action icons.
- Confirm Pawn Shop prices still read `Sell 1 wheat for 110 gold` and `Buy 1 wheat seed for 100 gold`.
- Confirm Farm Plant, Water, and Harvest button PNG art stays decorative and does not compete with the HTML text labels.
- Confirm unavailable Farm and Pawn Shop actions remain readable and visually softened rather than broken.
- Confirm no-slot Farm wording says `crop slot` instead of only `soil slot` where the player may need to select planted or ready wheat.
- Confirm ready-to-harvest guidance tells the player to select ready wheat when no slot is selected.
- Confirm Welcome page shows Squarebox as a small decorative helper without crowding the first-time path or Start Farming button.
- Confirm Farm page uses one Squarebox helper spot in the beginner guide instead of adding another character inside the Farm scene.
- Confirm Squarebox helper poses for planting, watering, and harvesting are display-only and do not change action rules.
- Confirm Squarebox does not cover crop slots, Selected Crop Slot details, or Plant / Water / Harvest buttons.
- Confirm Squarebox is hidden or compact enough on 360px and 390px widths to avoid horizontal scrolling.
- Confirm Inventory, Pawn Shop, and Help still render after the Farm fit pass.
- Confirm the full loop still works: plant, water, grow, harvest, sell wheat, buy wheat seed, refresh, and load.
- Confirm Version 0.6 art fit changes do not add actions, pages, rewards, quests, backend, account, online save, or future systems.
- Confirm Version 0.6 art fit changes do not change inventory values, prices, growth timing, harvest output, save key, or crop behavior.

## Navigation

- `Start Farming` on Welcome opens the Farm page.
- Manual button opens the Help / Manual page.
- Top navigation opens Welcome, Farm, Inventory, Pawn Shop, and Help.
- Active navigation state is visually clear.
- Farm is visually marked as the main page in navigation.

## Screens

- Welcome page shows the game name and enter-game action.
- App header shows `Version 0.5 Prototype`.
- App header shows a compact resource HUD for Gold, Wheat Seeds, and Wheat.
- Welcome page explains the first-time farming loop before the player enters Farm.
- Farm page shows the farm background PNG when available, with CSS fallback if the image is missing.
- Farm page shows land count.
- Farm page shows 16 crop slots.
- Farm page shows every empty crop slot as `Empty Soil` with soil tile art when available.
- Farm page shows inventory summary for gold, wheat seeds, and wheat.
- Farm page shows resource icons for gold, wheat seeds, wheat, and water where available.
- Farm page shows Squarebox idle art as a decorative farm character when available.
- Farm action buttons remain readable while using button PNG art where available.
- Farm page shows `Dev Fast Growth Mode`.
- Farm page shows a Current Goal panel and beginner loop guide.
- Farm page shows visual next-action hints on crop slots and action buttons.
- Farm page shows a read-only Selected Crop Slot detail panel with friendly crop status wording, estimated ready time, and next-action guidance.
- Farm crop tiles keep the crop art as the focus by showing only slot number, current status, and crop progress percentage when relevant.
- Inventory page shows Gold `0`, Wheat Seeds `4`, and Wheat `0`.
- Inventory page explains that gold buys wheat seeds.
- Inventory page explains that wheat seeds are planted on empty soil slots.
- Inventory page explains that wheat is sold at the Pawn Shop for gold.
- Inventory page shows the read-only Progress Tracking panel without crashing if older saved state has no progress data.
- Inventory page shows Current Farm Status and Progress Summary in compact mobile-friendly cards.
- Inventory page shows Farm Milestones below the statistics sections.
- Inventory page shows Local Save Info above the statistics sections.
- Inventory page shows Farm Activity Log below the progress and milestone sections.
- Pawn Shop page is separate from the Farm page.
- Pawn Shop page shows current gold, wheat seeds, and wheat.
- Pawn Shop page shows wheat seed price `100` gold.
- Pawn Shop page shows wheat sell price `110` gold.
- Pawn Shop page explains that selling 1 wheat gives `110` gold.
- Pawn Shop page explains that buying 1 wheat seed costs `100` gold.
- Pawn Shop page explains that harvesting gives wheat, not seed.
- Pawn Shop page visually highlights available buy/sell actions.
- Help / Manual page uses a readable GitHub-style documentation layout.
- Help / Manual page shows a Version 0.5 prototype guide status label and last updated text.
- Help / Manual page includes a First-Time Player Path section.

## Gameplay Checks

- The visible `Reset Dev State` button is present.
- Clicking `Reset Dev State` shows a simple browser confirmation.
- Canceling Reset Dev State keeps the current local state unchanged.
- Confirming Reset Dev State returns the displayed inventory to Gold `0`, Wheat Seeds `4`, and Wheat `0`.
- Select an empty crop slot.
- Click `Plant Wheat`.
- Confirm the selected slot status changes to `Needs Water`.
- Confirm the slot shows the wheat seed stage image.
- Confirm Wheat Seeds decreases from `4` to `3`.
- Confirm Farm Milestones shows First Seed as completed after planting.
- Confirm selected crop details show Crop `Wheat`, Status `Needs Water`, Stage `Seed Planted`, Progress `0%`, and Ready time `Water this wheat to start growth.`
- Expand Timing details and confirm Growth Started `Not set` and Last Watered `Not set`.
- Click `Water`.
- Confirm selected crop details show Watered `Yes`, Status `Growing`, and Ready time starts counting down.
- Expand Timing details and confirm Last Watered is set and Growth Started is set from the watering time.
- Confirm Farm Milestones shows First Watering as completed after watering.
- Refresh the browser.
- Confirm watered `Growing` state persists from localStorage.
- Click `Reset Dev State`.
- Confirm localStorage-backed state returns to 16 empty slots and 4 wheat seeds.
- With no seeds available after planting 4 slots, select another empty slot and click `Plant Wheat`.
- Confirm the friendly message explains that wheat seeds are needed and the Pawn Shop is where seeds are bought.
- Select an empty slot and click `Water`.
- Confirm the friendly message says `Select wheat that needs water first.`
- Without selecting a valid empty slot, click `Plant Wheat` and confirm the message says `Select an empty soil slot first.` or `Choose an empty soil slot before planting.`
- After planting and watering wheat, confirm growth progress starts increasing from the first watering time.
- Confirm wheat visuals progress from sprout to small to growing as progress increases.
- Wait for the dev fast-growth duration to pass.
- Confirm the watered crop reaches Status `Ready to Harvest` and Growth Progress `100%`.
- Confirm wheat that is ready to harvest shows the Mature Wheat stage image.
- Confirm selected crop details show Status `Ready to Harvest`, Next action `Harvest this wheat.`, and `Ready now. Harvest this wheat.`
- Click `Harvest`.
- Confirm feedback says `You harvested 1 wheat.`
- Confirm Wheat inventory increases by `1`.
- Confirm Farm Milestones shows First Harvest as completed after harvesting.
- Confirm the crop slot returns to `Empty Soil`.
- Refresh the browser.
- Confirm the harvested wheat count, empty crop slot, and milestone progress remain saved after refresh.
- Confirm wheat that needs water remains at `0%` growth.
- Select an empty slot and click `Harvest`; confirm the message says `There is no wheat here to harvest.`
- Select wheat that needs water or Growing wheat and click `Harvest`; confirm the message says `This wheat is still growing. Wait until it reaches 100%.`

## Pawn Shop Checks

- Harvest at least 1 wheat.
- Open Pawn Shop.
- Click `Sell 1 Wheat`.
- Confirm feedback says `You sold 1 wheat for 110 gold.`
- Confirm Wheat decreases by `1`.
- Confirm Gold increases by `110`.
- Confirm Farm Milestones shows First Sale as completed after selling wheat.
- Click `Buy 1 Wheat Seed`.
- Confirm feedback says `You bought 1 wheat seed.`
- Confirm Gold decreases by `100`.
- Confirm Wheat Seeds increases by `1`.
- Confirm Farm Milestones shows Seed Buyer as completed after buying a wheat seed.
- Refresh the browser.
- Confirm the updated Gold, Wheat Seeds, and Wheat values remain saved.
- With no wheat available, click `Sell 1 Wheat`; confirm the message says `You do not have wheat to sell yet. Harvest wheat that is ready first.`
- With less than 100 gold, click `Buy 1 Wheat Seed`; confirm the message says `You need 100 gold to buy 1 wheat seed. Sell wheat to earn gold.`
- No first tutorial sale bonus, bulk buy/sell, Wandering Merchant, harvest minigame, Wheat Fragment, seed return, thirst timer, dry crop timer, weed timer, land expansion, or tools are active yet.

## Help / Manual Checks

- Open Help from the main navigation.
- Confirm the Help page has section navigation buttons.
- Confirm these sections exist: Getting Started, First-Time Player Path, Version 0.2 Guidance, Version 0.3 Statistics, Version 0.3 Milestones, Version 0.4 Crop Detail, Version 0.4 Activity Log, Version 0.4 Farm UX, Version 0.5 HUD, Version 0.5 Page Cards, Version 0.5 Mobile HUD, Version 0.5 Feedback, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Version 0.1 Scope, Known Exclusions.
- Confirm Getting Started lists 1 land, 16 crop slots, 4 wheat seeds, 0 gold, and 0 wheat.
- Confirm First-Time Player Path lists: start on Farm, select empty soil, plant wheat, water wheat, wait, harvest, go to Pawn Shop, sell wheat, buy wheat seeds, return to Farm.
- Confirm First-Time Player Path mentions Dev Fast Growth Mode, temporary art, and Reset Dev State.
- Confirm Version 0.2 Guidance explains beginner loop clarity, Current Goal, Pawn Shop continuation, no seed return, stuck-state reset, and temporary art.
- Confirm Version 0.3 Statistics explains lifetime stats, Current Farm Status, Progress Summary, localStorage, no rewards, no achievements, no quests, and no online account save.
- Confirm Version 0.3 Milestones explains read-only progress markers, localStorage-derived progress, no rewards, no XP, no levels, no unlocks, no claim buttons, and no online account achievements.
- Confirm Version 0.4 Crop Detail explains that selecting a crop slot shows friendly status, progress, watered state, estimated ready time, and next action, and that the panel is read-only guidance.
- Confirm Version 0.4 Activity Log explains recent local action history, capped entries, no rewards, no notifications, no backend, and no online history.
- Confirm Version 0.4 Farm UX explains that Farm layout polish keeps crop details and action controls near the crop grid without changing gameplay.
- Confirm Version 0.5 HUD explains the top resource HUD, real local inventory values, current real pages only, no new resources, no backend, and no balance changes.
- Confirm Version 0.5 Page Cards explains shared card/panel styling, clearer empty states, no new systems, and no balance changes.
- Confirm Version 0.5 Mobile HUD explains mobile HUD/navigation refinements, real resource values only, no new pages, and no balance changes.
- Confirm Version 0.5 Feedback explains button/feedback polish, unavailable action clarity, no new systems, and no balance changes.
- Confirm Saving / localStorage explains Local Save Info, browser/device-only saves, browser data clearing risk, no online save, and Reset Dev State behavior.
- Confirm Crop Growth explains 7 real-life days, Dev Fast Growth Mode, timestamp progress after first watering, and unwatered crops staying at 0%.
- Confirm Pawn Shop explains 100 gold seed cost and 110 gold wheat sell price.
- Confirm FAQ includes questions about website-like visuals, Dev Fast Growth Mode, no seed return, buying wheat seeds, selling wheat, stuck test state, Current Goal, statistics rewards, milestone rewards, future save transfer, and excluded future systems.
- Confirm Known Exclusions lists Noodles, soup, customers, premium, payment, monetization, Long Long Coin, admin panel, account system, backend, Firebase, online save, notifications, achievements, XP, player levels, unlocks, quest rewards, reward-claim buttons, harvest minigame, Wheat Fragment, tools, land expansion, and Wandering Merchant.

## Responsive Checks

- Buttons are easy to tap on a phone-sized viewport.
- Navigation does not overflow on mobile.
- Top resource HUD wraps or stacks cleanly on mobile.
- Farm crop slots and crop art remain readable on mobile.
- Farm play area stacks cleanly on mobile and keeps the crop grid above the selected crop details.
- Ready-time text and `Ready to Harvest` crop labels fit without overflowing their panels.
- Farm visual hints do not cover slot content or block taps on mobile.
- Crop Detail Panel does not cover crop slots or block taps on mobile.
- Crop tile progress percentages fit inside crop slots on mobile.
- Text does not overlap with farm or shop placeholder elements.
- Pages do not require awkward horizontal scrolling at phone widths.
- Inventory statistics and Farm Milestones stack cleanly on phone-sized viewports.
- Farm Activity Log stacks cleanly on phone-sized viewports.
- Local Save Info cards stack cleanly on phone-sized viewports.

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
- `Ready to Harvest` crop state remains saved after refresh.
- Farm Milestones start at `0` progress for a clean save.
- Farm Milestones remain after refresh because progress counters persist in localStorage.
- Local Save Info Created and Last saved fields do not crash if missing or invalid.

## Version 0.3 Growth Start Regression Checks

- Reset Dev State.
- Plant wheat in slot A.
- Wait 10-15 seconds without watering.
- Confirm slot A remains at `0%`, Last Watered `Not set`, and Growth Started `Not set`.
- Water slot A.
- Confirm slot A starts growing from the watering time and does not jump forward based on planting time.
- Plant wheat in slot B.
- Wait while slot A is growing.
- Confirm slot B remains at `0%` until watered.
- Water slot B.
- Confirm slot B starts from its own watering time, not from slot A's growth time.
- Refresh the browser and confirm watered crop progress persists from each crop's own Growth Started time.

## Exclusion Checks

- No Noodles page is present.
- No customer, soup, premium, payment, Long Long Coin, admin, login, account system, backend, Firebase, online save, notification system, rewards, XP, player levels, unlocks, achievement logic, or claim buttons are present.
