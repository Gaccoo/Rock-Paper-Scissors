import React from 'react';
import './App.scss';
import NameInput from './components/NameInput/NameInput';
import Game from './components/Game/Game';
import { useAppSelector } from './store/hooks';
import { AIPlayer } from './store/AiSlice';

export const selectRandomOpponent = (playerArray: AIPlayer[]) => (playerArray
  .filter((item) => !item.disqualified).length - 1);

const App = () => {
  const gameState = useAppSelector((store) => store.gameSlice.gameState);

  return (
    <div className="app-wrapper">
      <div className="App-main">
        { gameState === 'Lobby' ? <NameInput /> : null }
        { gameState === 'Game' ? <Game /> : null }

      </div>
    </div>
  );
};

export default App;
