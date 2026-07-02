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
  'Buy seeds',
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
  'Backend',
  'Firebase',
  'Notifications',
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
    'Harvesting intentionally gives 1 wheat only. Seeds must be bought later with gold from selling wheat.',
  ],
  [
    'Why can I not buy seeds?',
    `A wheat seed costs ${WHEAT_SEED_COST} gold. Sell wheat at the Pawn Shop first if you do not have enough gold.`,
  ],
  [
    'Why can I not sell wheat?',
    'You need at least 1 harvested wheat in inventory before the Pawn Shop can buy wheat.',
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
          <p>Status: Version 0.1 tester guide. Last updated: July 3, 2026.</p>
        </div>
        <span className="manual-status-label">Version 0.1</span>
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
              grow, harvest, sell wheat, buy seed, and plant again.
            </p>
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
              Crops grow from timestamps, so progress continues after refresh or reopening
              the browser. In Version 0.1, unwatered crops do not grow.
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
              Version 0.1 saves progress in this browser using localStorage. Refreshing or
              reopening the browser should keep progress.
            </p>
            <p>
              Early test saves may be reset or changed later. This is not a server/account
              save yet.
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
