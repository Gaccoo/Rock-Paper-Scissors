import React, { useRef, useState } from 'react';
import logo from './assets/poker-logo.png';
import './App.scss';
import NameInput from './components/NameInput/NameInput';
import Game from './components/Game/Game';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { AIPlayer } from './store/AiSlice';

export const selectRandomOpponent = (playerArray: AIPlayer[]) => Math.floor(Math.random() * playerArray.length);

const App = () => {
  const gameState = useAppSelector((store) => store.gameSlice.gameState);

  return (
    <div className="App-main">
      {/* <div className="logo"> */}
      {/*  <img className="image" src={logo} alt="Rock Paper Scissors Lizard Spock" /> */}
      {/* </div> */}
      {
        gameState === 'Lobby' ? <NameInput /> : null
      }

      {
        gameState === 'Game' ? <Game /> : null
      }

    </div>
  );
};

export default App;
