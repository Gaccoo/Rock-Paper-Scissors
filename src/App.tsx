import React, { useRef, useState } from 'react';
import logo from './assets/poker-logo.png';
import './App.scss';
import NameInput from './components/NameInput/NameInput';
import Game from './components/Game/Game';

type GameState = 'Lobby' | 'Game' | 'Leaderboard'
export type Player = {
  name: string
  age: number
  chips: number
}
const App = () => {
  const [player, setPlayer] = useState<Player>({ name: '', age: NaN, chips: 100 });
  const [gameState, setGameState] = useState<GameState>('Lobby');
  const setGame = (value: {name: string, age: number}) => {
    setPlayer({ ...player, name: value.name, age: value.age });
    setGameState('Game');
  };

  const updateChips = (value: number) => {
    setPlayer({ ...player, chips: value });
  };

  return (
    <div className="App-main">
      {/* <div className="logo"> */}
      {/*  <img className="image" src={logo} alt="Rock Paper Scissors Lizard Spock" /> */}
      {/* </div> */}
      {
        gameState === 'Lobby' ? <NameInput onSubmit={setGame} /> : null
      }

      {
        gameState === 'Game' ? <Game player={player} updateChips={updateChips} /> : null
      }

    </div>
  );
};

export default App;
