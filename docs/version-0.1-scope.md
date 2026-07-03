# Road to Long Long Noodles - Version 0.1 Scope

Status: Version 0.1 farming scope preserved under Version 0.2 guidance and clarity passes

Version 0.1 is a frontend-only farming prototype. The farm is the main screen, with Inventory, Pawn Shop, and Help / Manual as separate pages.

Version 0.2 adds beginner guidance, visual objective feedback, first-time player flow polish, and QA fixes on top of this scope. It does not add new gameplay systems or change the Version 0.1 farming balance.

## Included In Version 0.1

- React + Vite project structure
- Placeholder Welcome page
- Farm page with one land and 16 visible crop slots wired to React state
- Inventory page wired to React state for gold, wheat seeds, and wheat
- Pawn Shop page for selling wheat and buying wheat seeds
- GitHub-style Help / Manual / FAQ page
- Asset folders for future PNG art
- Soft pastel, cloudy, mobile-friendly UI foundation
- Version 0.1 initial game state factory
- Development reset button for returning to the starting state
- localStorage save/load
- Plant wheat
- Water wheat
- Timestamp-based wheat growth
- Dev Fast Growth Mode for Version 0.1 testing
- Basic mature-wheat harvesting
- Pawn Shop sell 1 wheat for gold
- Pawn Shop buy 1 wheat seed with gold
- Help sections for Getting Started, Farming Basics, Crop Growth, Harvesting, Inventory, Pawn Shop, Saving / localStorage, FAQ, Scope, and Known Exclusions

## Quality Pass Expectations

- Large mobile-friendly navigation and action buttons
- Farm crop slots that fit small screens without horizontal scrolling
- Clear selected crop slot state
- Clear invalid-action feedback
- localStorage fallback to the initial state if saved data is missing or broken
- Refresh persistence for planted, watered, mature, harvested, sold, and bought state

## Explicitly Excluded

- Noodles system
- Soup system
- Customer system
- Premium or payment systems
- Monetization
- Long Long Coin
- Admin panel
- Login, account system, backend, Firebase, online save, or server validation
- Real notifications
- Thirst timers, dry crop timers, and weed timers
- Harvest minigame, Wheat Fragment, seed return, and harvest result grades
- First tutorial sale bonus, bulk buy/sell, Wandering Merchant, land expansion, and tools
- Final art assets
