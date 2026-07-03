import { useCallback, useState } from 'react';
import AppShell from './components/AppShell.jsx';
import {
  buyWheatSeed,
  harvestWheat,
  plantWheat,
  sellWheat,
  waterCrop,
} from './game/gameActions.js';
import { recalculateCropGrowth } from './game/gameGrowth.js';
import { createInitialGameState } from './game/gameStateUtils.js';
import { clearGameState, loadGameState, saveGameState } from './game/storage.js';
import FarmPage from './pages/FarmPage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import PawnShopPage from './pages/PawnShopPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';

const pages = {
  welcome: WelcomePage,
  farm: FarmPage,
  inventory: InventoryPage,
  pawnShop: PawnShopPage,
  help: HelpPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('welcome');
  const [gameState, setGameState] = useState(() => loadGameState());
  const Page = pages[activePage];

  function commitGameState(nextGameState) {
    setGameState(nextGameState);
    saveGameState(nextGameState);
  }

  const handleRecalculateGrowth = useCallback(() => {
    setGameState((currentGameState) => {
      const growthResult = recalculateCropGrowth(currentGameState);

      if (!growthResult.changed) {
        return currentGameState;
      }

      if (growthResult.shouldSave) {
        saveGameState(growthResult.gameState);
      }

      return growthResult.gameState;
    });
  }, []);

  function handlePlantWheat(slotId) {
    const result = plantWheat(gameState, slotId);

    if (result.success) {
      commitGameState(result.gameState);
    }

    return result;
  }

  function handleWaterCrop(slotId) {
    const result = waterCrop(gameState, slotId);

    if (result.success) {
      commitGameState(result.gameState);
    }

    return result;
  }

  function handleHarvestWheat(slotId) {
    const result = harvestWheat(gameState, slotId);

    if (result.success) {
      commitGameState(result.gameState);
    }

    return result;
  }

  function handleBuyWheatSeed() {
    const result = buyWheatSeed(gameState);

    if (result.success) {
      commitGameState(result.gameState);
    }

    return result;
  }

  function handleSellWheat() {
    const result = sellWheat(gameState);

    if (result.success) {
      commitGameState(result.gameState);
    }

    return result;
  }

  function handleResetDevState() {
    const resetState = createInitialGameState();
    const totalResets = (gameState.progress?.totalResets ?? 0) + 1;

    clearGameState();
    commitGameState({
      ...resetState,
      progress: {
        ...resetState.progress,
        totalResets,
      },
    });
  }

  return (
    <AppShell
      activePage={activePage}
      onNavigate={setActivePage}
      onResetDevState={handleResetDevState}
    >
      <Page
        gameState={gameState}
        onBuyWheatSeed={handleBuyWheatSeed}
        onHarvestWheat={handleHarvestWheat}
        onNavigate={setActivePage}
        onPlantWheat={handlePlantWheat}
        onRecalculateGrowth={handleRecalculateGrowth}
        onSellWheat={handleSellWheat}
        onWaterCrop={handleWaterCrop}
      />
    </AppShell>
  );
}
