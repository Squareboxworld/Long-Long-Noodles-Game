import {
  DEV_WHEAT_GROWTH_DURATION_MS,
  PAWN_SHOP_WHEAT_SELL_PRICE,
  REAL_WHEAT_GROWTH_DURATION_MS,
  WHEAT_SEED_COST,
} from '../game/gameConstants.js';

const realGrowthDays = REAL_WHEAT_GROWTH_DURATION_MS / (24 * 60 * 60 * 1000);
const devGrowthSeconds = DEV_WHEAT_GROWTH_DURATION_MS / 1000;

const sectionLinks = [
  ['getting-started', 'Getting Started'],
  ['first-time-path', 'First-Time Player Path'],
  ['version-0-2-guidance', 'Version 0.2 Guidance'],
  ['version-0-3-statistics', 'Version 0.3 Statistics'],
  ['version-0-3-milestones', 'Version 0.3 Milestones'],
  ['farming-basics', 'Farming Basics'],
  ['crop-growth', 'Crop Growth'],
  ['harvesting', 'Harvesting'],
  ['inventory', 'Inventory'],
  ['pawn-shop', 'Pawn Shop'],
  ['saving', 'Saving / localStorage'],
  ['faq', 'FAQ'],
  ['scope', 'Version 0.1 Scope'],
  ['exclusions', 'Known Exclusions'],
];

const includedScope = [
  'Welcome',
  'Farm',
  'Inventory',
  'Pawn Shop',
  'Help',
  '1 land / 16 crop slots',
  'Plant wheat',
  'Water wheat',
  'Real-time growth test',
  'Harvest wheat',
  'Sell wheat',
  'Buy wheat seeds',
  'localStorage save/load',
];

const knownExclusions = [
  'Noodles',
  'Soup',
  'Customers',
  'Premium',
  'Payment',
  'Monetization',
  'Long Long Coin',
  'Admin panel',
  'Account system',
  'Backend',
  'Firebase',
  'Online save',
  'Notifications',
  'Achievements',
  'Quest rewards',
  'Reward-claim buttons',
  'XP',
  'Player levels',
  'Unlocks',
  'Harvest minigame',
  'Wheat Fragment',
  'Tools',
  'Land expansion',
  'Wandering Merchant',
];

const faqItems = [
  [
    'Why does the game look website-like right now?',
    'Version 0.1 is a browser prototype. The priority is proving the farming loop and save behavior before final art, animation, and richer game presentation are added.',
  ],
  [
    'Why is Dev Fast Growth Mode active?',
    `The real wheat duration is ${realGrowthDays} real-life days. Dev Fast Growth Mode uses ${devGrowthSeconds} seconds so testers can check the full loop quickly.`,
  ],
  [
    'Why did harvesting not return seeds?',
    'Harvesting intentionally gives 1 wheat only. Wheat seeds must be bought later with gold from selling wheat.',
  ],
  [
    'Why can I not buy wheat seeds?',
    `A wheat seed costs ${WHEAT_SEED_COST} gold. Sell wheat at the Pawn Shop first if you do not have enough gold.`,
  ],
  [
    'Why can I not sell wheat?',
    'You need at least 1 harvested wheat in inventory before the Pawn Shop can buy wheat.',
  ],
  [
    'What should I do if I get stuck in the test build?',
    'If you have no seeds, no wheat, and not enough gold, use Reset Dev State to restart the local test state.',
  ],
  [
    'What does Reset Dev State do?',
    'Reset Dev State restarts the prototype test state in this browser. It may erase local progress here and does not affect an online account because no online account exists.',
  ],
  [
    'Why is there a Current Goal panel?',
    'It reads the current farm and inventory state and suggests the next helpful action. It is guidance only and does not give rewards.',
  ],
  [
    'Do the statistics give rewards?',
    'No. Version 0.3 statistics are read-only local prototype data. They help testers understand the farming loop but do not unlock rewards, achievements, or quests.',
  ],
  [
    'Do Farm Milestones give rewards?',
    'No. Farm Milestones are read-only progress markers. There are no claim buttons, XP, levels, unlocks, or achievement rewards in this prototype.',
  ],
  [
    'Will this save transfer to the future official game?',
    'Version 0.1 uses browser localStorage for testing. Early test saves may be reset or changed later and are not server/account saves.',
  ],
  [
    'Where are Noodles, customers, soup, Long Long Coin, and premium?',
    'Those are future or on-hold systems. They are intentionally not active in Version 0.1.',
  ],
];

export default function HelpPage() {
  return (
    <article className="manual-page">
      <header className="manual-header">
        <div>
          <p className="eyebrow">GitHub-style documentation</p>
          <h2>Help / Manual</h2>
          <p>Read the guide if you are unsure what to do next.</p>
          <p>Status: Version 0.3 save and progress guide. Last updated: July 4, 2026.</p>
        </div>
        <span className="manual-status-label">Version 0.3 prototype guide</span>
      </header>

      <div className="manual-layout">
        <nav className="manual-sidebar" aria-label="Help sections">
          {sectionLinks.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <div className="manual-content">
          <section className="manual-section" id="getting-started">
            <h3>Getting Started</h3>
            <p>
              You start with 1 land, 16 crop slots, 4 wheat seeds, 0 gold, and 0 wheat.
              The goal of Version 0.1 is to test the basic farming loop: plant, water,
              grow, harvest, sell wheat, buy wheat seeds, and plant again.
            </p>
          </section>

          <section className="manual-section" id="first-time-path">
            <h3>First-Time Player Path</h3>
            <ol>
              <li>Start on Farm.</li>
              <li>Select an empty soil slot.</li>
              <li>Plant wheat.</li>
              <li>Water wheat.</li>
              <li>Wait until mature.</li>
              <li>Harvest wheat.</li>
              <li>Go to Pawn Shop.</li>
              <li>Sell wheat.</li>
              <li>Buy more wheat seeds.</li>
              <li>Return to Farm.</li>
            </ol>
            <p>
              Dev Fast Growth Mode is active for testing. Temporary art is for testing.
              Reset Dev State restarts the prototype.
            </p>
          </section>

          <section className="manual-section" id="version-0-2-guidance">
            <h3>Version 0.2 Beginner Guidance</h3>
            <p>
              Version 0.2 improves explanation around the existing farming loop. It does
              not add rewards, quests, balance changes, or new gameplay systems.
            </p>
            <ul>
              <li>
                The Current Goal panel reads your farm and inventory state, then suggests
                a helpful next action.
              </li>
              <li>
                The beginner loop reminder explains: plant, water, wait, harvest, sell,
                buy wheat seeds, and repeat.
              </li>
              <li>
                The Pawn Shop explains that selling 1 wheat gives {PAWN_SHOP_WHEAT_SELL_PRICE}{' '}
                gold and buying 1 wheat seed costs {WHEAT_SEED_COST} gold.
              </li>
              <li>
                Wheat does not turn back into seed. Harvesting gives wheat, then the Pawn
                Shop lets you turn wheat into gold and gold into wheat seeds.
              </li>
              <li>
                If you are stuck with no seeds, no wheat, and not enough gold, use Reset
                Dev State to restart this local test build.
              </li>
            </ul>
            <p>
              The current PNG assets are temporary test art for layout and integration.
              Final handmade art may replace them later.
            </p>
          </section>

          <section className="manual-section" id="version-0-3-statistics">
            <h3>Version 0.3 Farm Statistics</h3>
            <p>
              Version 0.3 adds read-only statistics to help testers understand the farming loop.
              These stats are local-only prototype data stored in browser localStorage.
            </p>
            <ul>
              <li>
                Lifetime stats count successful farming and Pawn Shop actions such as planting,
                watering, harvesting, selling wheat, buying wheat seeds, and reset use.
              </li>
              <li>
                Current Farm Status is derived from the crop slots and shows empty, planted,
                unwatered, growing, and mature wheat slot counts.
              </li>
              <li>
                Progress Summary derives total wheat cycle actions, net gold from trading, and
                current farming capacity from existing local state.
              </li>
              <li>
                Farm Milestones use the same progress counters to show simple read-only markers
                for loop progress.
              </li>
              <li>
                Local Save Info shows save type, save location, online account status, backend
                status, version, dev mode, created time, and last saved time.
              </li>
              <li>
                A small Version 0.3 Prototype label appears in the app header so testers know
                which local prototype they are checking.
              </li>
              <li>
                Statistics do not give rewards, achievements, quests, levels, or claim buttons.
              </li>
              <li>
                This is not online account data, backend data, or an official transferable save.
              </li>
            </ul>
          </section>

          <section className="manual-section" id="version-0-3-milestones">
            <h3>Version 0.3 Farm Milestones</h3>
            <p>
              Farm Milestones show progress through the farming loop using existing local
              progress counters. They are stored only through the browser localStorage save data.
            </p>
            <ul>
              <li>Milestones are local-only prototype progress markers.</li>
              <li>They do not give rewards, XP, levels, unlocks, or achievement completion.</li>
              <li>There are no claim buttons.</li>
              <li>They are not online account achievements.</li>
              <li>Reset Dev State restarts the local test state and can change milestone progress.</li>
            </ul>
          </section>

          <section className="manual-section" id="farming-basics">
            <h3>Farming Basics</h3>
            <ol>
              <li>Select an empty crop slot on the Farm page.</li>
              <li>Plant wheat if you have wheat seeds.</li>
              <li>Water the wheat.</li>
              <li>Wait for the crop to grow.</li>
              <li>Harvest the wheat when it is mature.</li>
            </ol>
          </section>

          <section className="manual-section" id="crop-growth">
            <h3>Crop Growth</h3>
            <p>
              The real design uses a {realGrowthDays}-day wheat growth duration. Version
              0.1 uses Dev Fast Growth Mode so testers do not need to wait 7 days.
            </p>
            <p>
              Crops start growing after the first successful watering. Growth then uses
              timestamps, so progress continues after refresh or reopening the browser. In
              Version 0.3, unwatered crops stay at 0%.
            </p>
          </section>

          <section className="manual-section" id="harvesting">
            <h3>Harvesting</h3>
            <p>
              Mature wheat can be harvested from the Farm page. Harvesting gives 1 wheat
              and resets the crop slot to empty.
            </p>
            <p>
              Harvesting does not return seeds. The harvest minigame and Wheat Fragment
              system are future features.
            </p>
          </section>

          <section className="manual-section" id="inventory">
            <h3>Inventory</h3>
            <p>
              Gold, wheat seeds, and wheat are tracked in the Inventory page and in the Farm
              summary. Planting uses wheat seeds, harvesting gives wheat, selling wheat gives
              gold, and buying seeds uses gold.
            </p>
            <p>
              The Inventory page also shows read-only Version 0.3 statistics: lifetime action
              counts, current farm slot status, simple derived progress summary values, and Farm
              Milestones. It also shows Local Save Info for this browser save.
            </p>
          </section>

          <section className="manual-section" id="pawn-shop">
            <h3>Pawn Shop</h3>
            <p>
              Pawn Shop is the normal always-available shop. Wheat seeds cost {WHEAT_SEED_COST}{' '}
              gold, and Pawn Shop buys 1 wheat for {PAWN_SHOP_WHEAT_SELL_PRICE} gold.
            </p>
            <p>
              Harvesting does not return seeds. You must sell wheat to buy more seeds.
              Wandering Merchant is a future system and is not active in Version 0.1.
            </p>
          </section>

          <section className="manual-section" id="saving">
            <h3>Saving / localStorage</h3>
            <p>
              Version 0.1 saves game state in this browser using localStorage. Refreshing or
              reopening the browser should keep inventory, crop state, and Version 0.3 lifetime
              statistics.
            </p>
            <p>
              Early test saves may be reset or changed later. This is not a server/account save,
              online save, or official transferable profile.
            </p>
            <p>
              The Local Save Info panel on Inventory explains that the save is local to this
              browser/device. Clearing browser data or using another device may remove or hide
              this save.
            </p>
            <p>
              Reset Dev State is mainly for development and testing. It restarts the prototype
              test state in this browser and may erase current local progress here. It does not
              affect any online account because no online account exists in this prototype.
            </p>
          </section>

          <section className="manual-section" id="faq">
            <h3>FAQ</h3>
            <div className="faq-list">
              {faqItems.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="manual-section" id="scope">
            <h3>Version 0.1 Scope</h3>
            <ul className="manual-tag-list">
              {includedScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="manual-section" id="exclusions">
            <h3>Known Exclusions</h3>
            <p>These systems are intentionally excluded from Version 0.1.</p>
            <ul className="manual-tag-list">
              {knownExclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
