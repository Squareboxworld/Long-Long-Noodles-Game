import { useState } from 'react';
import { canBuyWheatSeed, canSellWheat } from '../game/gameActions.js';
import { PAWN_SHOP_WHEAT_SELL_PRICE, WHEAT_SEED_COST } from '../game/gameConstants.js';

const shopInventoryItems = [
  ['gold', 'Gold'],
  ['wheatSeeds', 'Wheat Seeds'],
  ['wheat', 'Wheat'],
];

function getShopGuidance(buyIsValid, sellIsValid) {
  if (sellIsValid && buyIsValid) {
    return 'You can sell 1 wheat for 110 gold or buy 1 wheat seed for 100 gold.';
  }

  if (sellIsValid) {
    return 'Useful next action: sell 1 wheat for 110 gold.';
  }

  if (buyIsValid) {
    return 'Useful next action: buy 1 wheat seed for 100 gold.';
  }

  return 'No Pawn Shop action is ready yet. Harvest wheat first, then sell wheat here for gold.';
}

export default function PawnShopPage({ gameState, onBuyWheatSeed, onSellWheat }) {
  const { inventory } = gameState;
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Sell harvested wheat, then buy wheat seeds to keep farming.',
  );
  const buyIsValid = canBuyWheatSeed(gameState);
  const sellIsValid = canSellWheat(gameState);
  const shopGuidance = getShopGuidance(buyIsValid, sellIsValid);

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
      setFeedbackMessage('You do not have wheat to sell yet. Harvest wheat that is ready first.');
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
          Sell wheat for gold, then buy wheat seeds to continue farming.
        </p>
      </div>

      <div className="shop-board game-panel">
        <div className="shop-roof">Pawn Shop</div>
        <div className="shop-inventory-summary" aria-label="Current inventory">
          {shopInventoryItems.map(([key, label]) => (
            <article className="game-card" key={key}>
              <span>{label}</span>
              <strong>{inventory[key]}</strong>
            </article>
          ))}
        </div>
        <section className="shop-helper-panel game-panel" aria-label="How the Pawn Shop works">
          <div>
            <p className="eyebrow">How Pawn Shop works</p>
            <h3>Harvest wheat, sell wheat, buy wheat seeds.</h3>
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
        <p className={!buyIsValid && !sellIsValid ? 'shop-next-note empty-state-card' : 'shop-next-note'}>
          {shopGuidance}
        </p>
        <div className="shop-counter">
          <article className={sellIsValid ? 'shop-offer game-card shop-offer-suggested' : 'shop-offer game-card'}>
            {sellIsValid ? <span className="shop-offer-cue">Useful now</span> : null}
            <h3>Sell Wheat</h3>
            <p>Sell 1 wheat for {PAWN_SHOP_WHEAT_SELL_PRICE} gold.</p>
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
          <article className={buyIsValid ? 'shop-offer game-card shop-offer-suggested' : 'shop-offer game-card'}>
            {buyIsValid ? <span className="shop-offer-cue">Available</span> : null}
            <h3>Buy Wheat Seed</h3>
            <p>Buy 1 wheat seed for {WHEAT_SEED_COST} gold.</p>
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
