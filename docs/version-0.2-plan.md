# Road to Long Long Noodles - Version 0.2 Guidance Plan

Status: beginner guidance and visual objective feedback for the existing Version 0.1 farming prototype

Version 0.2 currently improves clarity around the existing loop only. It does not add new gameplay systems, rewards, quests, or balance changes.

## Included In Version 0.2 Prompt 1

- Farm page Current Goal panel derived from existing game state
- Simple beginner loop guide for plant, water, wait, harvest, sell, buy seed, repeat
- Clearer Farm action feedback for invalid plant, water, and harvest attempts
- Pawn Shop helper text explaining how selling wheat and buying seeds continue the loop
- Clearer Pawn Shop feedback for not enough gold and no wheat
- Help / Manual Version 0.2 guidance section
- Documentation and manual test checklist updates
- Mobile-friendly layout support for the new guidance panels

## Included In Version 0.2 Prompt 2

- Next-action crop slot highlights derived from existing crop and inventory state
- Current Goal visual action cue with existing resource/action icons
- Contextual Farm action helper text
- Suggested Plant, Water, and Harvest button emphasis when an action is currently useful
- Pawn Shop visual guidance for available sell and buy actions
- Gentle explanation when no Pawn Shop action is currently ready
- Static, motion-safe styling for visual hints
- Documentation and manual test checklist updates

## Current Objective Behavior

The Current Goal panel is guidance only. It reads the existing farm and inventory state and suggests the next useful action. Active crop care is prioritized before broader loop reminders:

- Harvest mature wheat
- Water planted wheat that has not been watered
- Wait while watered wheat is growing
- Sell harvested wheat at the Pawn Shop
- Buy wheat seeds when gold is available and seeds are empty
- Plant wheat when seeds and empty slots are available
- Use Reset Dev State if the local test build is stuck with no seeds, no wheat, and not enough gold

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
- Dev Fast Growth Mode remains active for testing
- localStorage key remains unchanged

## Visual Feedback Rules

Visual objective feedback is presentation only and is derived from existing state:

- Empty crop slots show a plant hint when wheat seeds are available
- Planted unwatered wheat shows a needs-water hint
- Watered growing wheat shows a calm growing hint
- Mature wheat shows a clear harvest hint
- Selected slot outline remains the strongest crop slot visual state
- Farm action buttons visually emphasize Plant, Water, or Harvest when that action is useful for the selected slot
- Pawn Shop visually emphasizes Sell Wheat when wheat is available and Buy Wheat Seed when gold is at least 100

## Explicitly Not Included

- Real quest rewards
- Daily login rewards
- New gameplay systems
- Noodles
- Soup
- Customers
- Premium
- Payment
- Monetization
- Long Long Coin
- Admin panel
- Backend
- Firebase
- Notifications
- Harvest minigame
- Wheat Fragment
- Tools
- Land expansion
- Wandering Merchant
