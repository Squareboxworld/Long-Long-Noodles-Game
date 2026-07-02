const inventoryCards = [
  {
    key: 'gold',
    label: 'Gold',
    icon: '🪙',
    note: 'Earned by selling wheat at the Pawn Shop. Used to buy more wheat seeds.',
  },
  {
    key: 'wheatSeeds',
    label: 'Wheat Seeds',
    icon: '🌰',
    note: 'Used when planting wheat in an empty farm slot.',
  },
  {
    key: 'wheat',
    label: 'Wheat',
    icon: '🌾',
    note: 'Gained by harvesting mature wheat. Sold at the Pawn Shop for gold.',
  },
];

export default function InventoryPage({ gameState }) {
  const { inventory } = gameState;

  return (
    <section className="inventory-page">
      <div className="section-heading">
        <p className="eyebrow">Starter resources</p>
        <h2>Inventory</h2>
        <p>
          Current Version 0.1 inventory state. Planting, harvesting, and Pawn Shop changes
          are saved locally in this browser.
        </p>
      </div>

      <div className="inventory-grid">
        {inventoryCards.map((item) => (
          <article className="inventory-card" key={item.label}>
            <span className="inventory-icon" aria-hidden="true">
              {item.icon}
            </span>
            <h3>{item.label}</h3>
            <strong>{inventory[item.key]}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
