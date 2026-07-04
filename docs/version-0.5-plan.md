# Road to Long Long Noodles - Version 0.5 UI Shell Plan

Status: Version 0.5 begins with Game HUD / UI Shell Foundation for the existing local farming prototype.

Version 0.5 Prompt 1 makes the app feel more like one coherent cozy farming game without adding new gameplay systems. It improves the top shell, resource summary, navigation presentation, and page heading consistency while keeping all Version 0.4 farming behavior intact.

Version 0.5 Prompt 2 improves shared page card and panel styling across the current real pages. This is visual polish only and does not add systems, pages, rewards, or balance changes.

Version 0.5 Prompt 3 refines the mobile HUD, resource bar, and navigation. It keeps the same real resources and current pages while making the header and navigation easier to use on phone-sized screens.

Version 0.5 Prompt 4 polishes buttons, action areas, feedback messages, and unavailable states across the current real interactions. It keeps failed-action clicks available for friendly messages and does not change action rules.

Version 0.5 Prompt 5 completes a final UI shell QA and cleanup pass across the HUD, navigation, shared panels, buttons, feedback messages, and mobile layouts. It keeps the same gameplay rules, pages, resources, save key, and local-only prototype scope.

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

## Included In Version 0.5 Prompt 2

- Shared `game-panel`, `game-card`, and `empty-state-card` styling
- More consistent panel/card treatment across Welcome, Farm, Inventory, Pawn Shop, and Help
- Softer section hierarchy for Inventory statistics, Farm Milestones, Farm Activity Log, and Local Save Info
- More cohesive Pawn Shop inventory, helper, guidance, and offer panels
- Help / Manual sections styled as readable documentation panels
- Clearer empty-state wording for no selected crop slot, no completed Farm Milestones, empty Farm Activity Log, and unavailable Pawn Shop actions
- Mobile-safe spacing and stacking for shared panels
- README, Help / Manual, and manual test checklist updates

## Included In Version 0.5 Prompt 3

- More compact mobile title and status-label spacing
- Resource chips tuned for phone width while still showing only Gold, Wheat Seeds, and Wheat
- Navigation tap target and wrapping refinements
- Visible `Current` marker for the active navigation item
- `aria-current` and explicit navigation/resource labels for accessibility basics
- Shorter Reset Dev State helper wording in the top shell
- README, Help / Manual, and manual test checklist updates

## Included In Version 0.5 Prompt 4

- More consistent shared button surfaces for primary, secondary, harvest, shop, navigation, and reset actions
- Compact info/success/warning feedback message styling
- Clearer visual treatment for unavailable-but-clickable actions
- Suggested Farm action styling kept visible without aggressive motion
- Pawn Shop available/unavailable offer states polished
- Reset Dev State button styled as a development/testing reset action
- Accessibility basics for active navigation and live feedback messages
- README, Help / Manual, and manual test checklist updates

## Included In Version 0.5 Prompt 5

- Final HUD review for title, prototype labels, Dev Fast Growth Mode, resource chips, and Reset Dev State helper text
- Mobile HUD sizing cleanup so stacked header content no longer keeps desktop flex-basis spacing
- Final navigation review for the five real pages, active state, tap targets, focus state, and mobile wrapping
- Final shared page/panel review across Welcome, Farm, Inventory, Pawn Shop, and Help
- Final button and feedback review for existing actions only
- Browser checks at 360px and 390px widths
- Full loop source regression check for plant, water, mature, harvest, sell, buy, progress, milestones, and activity log behavior
- README and manual test checklist updates

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

## Shared Page Styling

The shared page styling is presentation-only:

- Existing panels and cards use related borders, backgrounds, radius, and soft shadows.
- Empty-state cards explain what to do or what will appear later.
- Section headers remain short and scannable.
- The styling does not create new actions or saved state.

## Mobile HUD / Navigation Behavior

- The HUD is not fixed; it stacks naturally so page content is not hidden behind it.
- Status labels stay compact on smaller screens.
- Resource chips remain real inventory only and do not introduce new currencies or items.
- Navigation keeps only Welcome, Farm, Inventory, Pawn Shop, and Help.
- Active navigation is shown with color, shape, `Current` text, and `aria-current`.
- Final QA tightened stacked mobile HUD sizing by removing desktop flex-basis spacing from the mobile header layout.

## Button / Feedback Behavior

- Buttons remain tied to existing real actions only.
- Farm action buttons stay clickable when unavailable so they can show friendly guidance.
- Success and warning messages are visual presentation only and do not change save data.
- Pawn Shop prices and action rules remain unchanged.
- Reset Dev State still uses the existing browser confirmation behavior.

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
