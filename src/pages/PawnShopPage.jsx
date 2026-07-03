import { useState } from 'react';
import { canBuyWheatSeed, canSellWheat } from '../game/gameActions.js';
import { PAWN_SHOP_WHEAT_SELL_PRICE, WHEAT_SEED_COST } from '../game/gameConstants.js';

const shopInventoryItems = [
  ['gold', 'Gold'],
  ['wheatSeeds', 'Wheat Seeds'],
  ['wheat', 'Wheat'],
];

export default function PawnShopPage({ gameState, onBuyWheatSeed, onSellWheat }) {
  const { inventory } = gameState;
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Sell harvested wheat, then buy seeds to keep farming.',
  );
  const buyIsValid = canBuyWheatSeed(gameState);
  const sellIsValid = canSellWheat(gameState);

  function handleBuyWheatSeed() {
    if (!buyIsValid) {
      setFeedbackMessage(
        `You need ${WHEAT_SEED_COST} gold to buy 1 wheat seed. Sell wheat to earn gold.`,
      );
      return;
    }

    const result = onBuyWheatSeed();
    setFeedbackMessage(result.message);
  }

  function handleSellWheat() {
    if (!sellIsValid) {
      setFeedbackMessage('You do not have wheat to sell yet. Harvest mature wheat first.');
      return;
    }

    const result = onSellWheat();
    setFeedbackMessage(result.message);
  }

  return (
    <section className="shop-page">
      <div className="section-heading">
        <p className="eyebrow">Separate area</p>
        <h2>Pawn Shop</h2>
        <p>
          The normal always-available shop for the Version 0.1 wheat loop.
        </p>
      </div>

      <div className="shop-board">
        <div className="shop-roof">Pawn Shop</div>
        <div className="shop-inventory-summary" aria-label="Current inventory">
          {shopInventoryItems.map(([key, label]) => (
            <article key={key}>
              <span>{label}</span>
              <strong>{inventory[key]}</strong>
            </article>
          ))}
        </div>
        <section className="shop-helper-panel" aria-label="How the Pawn Shop works">
          <div>
            <p className="eyebrow">How the shop works</p>
            <h3>Harvest wheat, sell wheat, buy seeds.</h3>
            <p>
              Harvesting gives wheat, not seed. The Pawn Shop is how the loop continues
              after harvest.
            </p>
          </div>
          <ul className="shop-helper-list">
            <li>
              <span>Sell 1 wheat</span>
              <strong>+{PAWN_SHOP_WHEAT_SELL_PRICE} gold</strong>
            </li>
            <li>
              <span>Buy 1 wheat seed</span>
              <strong>-{WHEAT_SEED_COST} gold</strong>
            </li>
          </ul>
        </section>
        <div className="shop-counter">
          <article className="shop-offer">
            <h3>Sell Wheat</h3>
            <p>Pawn Shop buys 1 wheat for {PAWN_SHOP_WHEAT_SELL_PRICE} gold.</p>
            <p className="shop-offer-status">
              {sellIsValid ? 'Ready to sell 1 wheat.' : 'Need at least 1 wheat to sell.'}
            </p>
            <button
              className={sellIsValid ? 'shop-action' : 'shop-action action-softened'}
              type="button"
              aria-disabled={!sellIsValid}
              onClick={handleSellWheat}
            >
              Sell 1 Wheat
            </button>
          </article>
          <article className="shop-offer">
            <h3>Buy Wheat Seed</h3>
            <p>1 wheat seed costs {WHEAT_SEED_COST} gold.</p>
            <p className="shop-offer-status">
              {buyIsValid ? 'Ready to buy 1 wheat seed.' : `Need ${WHEAT_SEED_COST} gold to buy.`}
            </p>
            <button
              className={buyIsValid ? 'shop-action' : 'shop-action action-softened'}
              type="button"
              aria-disabled={!buyIsValid}
              onClick={handleBuyWheatSeed}
            >
              Buy 1 Wheat Seed
            </button>
          </article>
        </div>
        <p className="feedback-message shop-feedback">{feedbackMessage}</p>
      </div>
    </section>
  );
}
