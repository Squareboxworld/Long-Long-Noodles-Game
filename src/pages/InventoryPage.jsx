import { getAssetPath } from '../utils/assets.js';

const inventoryCards = [
  {
    key: 'gold',
    label: 'Gold',
    assetId: 'icon_gold_coin',
    icon: '🪙',
    note: 'Used to buy wheat seeds.',
  },
  {
    key: 'wheatSeeds',
    label: 'Wheat Seeds',
    assetId: 'icon_wheat_seed',
    icon: '🌰',
    note: 'Plant these on empty soil slots.',
  },
  {
    key: 'wheat',
    label: 'Wheat',
    assetId: 'icon_wheat',
    icon: '🌾',
    note: 'Sell this at the Pawn Shop for gold.',
  },
];

const progressCards = [
  ['lifetimeWheatPlanted', 'Wheat planted'],
  ['lifetimeWheatWatered', 'Wheat watered'],
  ['lifetimeWheatHarvested', 'Wheat harvested'],
  ['lifetimeWheatSold', 'Wheat sold'],
  ['lifetimeSeedsBought', 'Seeds bought'],
  ['lifetimeGoldEarned', 'Gold earned'],
  ['lifetimeGoldSpent', 'Gold spent'],
  ['totalResets', 'Reset count'],
];

function hideBrokenImage(event) {
  event.currentTarget.hidden = true;
}

function InventoryIcon({ assetId, fallback }) {
  const iconPath = getAssetPath(assetId);

  if (iconPath) {
    return (
      <img
        alt=""
        className="inventory-icon inventory-image-icon"
        draggable="false"
        onError={hideBrokenImage}
        src={iconPath}
      />
    );
  }

  return (
    <span className="inventory-icon" aria-hidden="true">
      {fallback}
    </span>
  );
}

export default function InventoryPage({ gameState }) {
  const { inventory } = gameState;
  const progress = gameState.progress ?? {};

  return (
    <section className="inventory-page">
      <div className="section-heading">
        <p className="eyebrow">Starter resources</p>
        <h2>Inventory</h2>
        <p>
          Check your gold, wheat seeds, and harvested wheat.
        </p>
      </div>

      <div className="inventory-grid">
        {inventoryCards.map((item) => (
          <article className="inventory-card" key={item.label}>
            <InventoryIcon assetId={item.assetId} fallback={item.icon} />
            <h3>{item.label}</h3>
            <strong>{inventory[item.key]}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <section className="progress-tracking-panel" aria-labelledby="progress-tracking-heading">
        <div>
          <p className="eyebrow">Version 0.3 check</p>
          <h3 id="progress-tracking-heading">Progress Tracking</h3>
          <p>
            Read-only lifetime counters for testing the local progress data foundation.
          </p>
        </div>

        <div className="progress-tracking-grid">
          {progressCards.map(([key, label]) => {
            const value = Number.isFinite(progress[key]) ? progress[key] : 0;

            return (
              <article className="progress-tracking-card" key={key}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
