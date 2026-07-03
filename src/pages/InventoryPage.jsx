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
    </section>
  );
}
