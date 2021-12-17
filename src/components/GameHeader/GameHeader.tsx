import React from 'react';
import './GameHeader-style.scss';
import { Player } from '../../App';
import chipIcon from '../../assets/chip-icon.png';
import logo from '../../assets/poker-logo-white.png';

type GameProps = {
  player: Player
  AI: {name: string, chips: number}
}

const GameHeader = ({ player, AI } : GameProps) => {
  const a = 1;
  return (
    <div className="game-header">
      <div className="player-window">
        <span>{player.name}</span>
        <span>{player.chips}</span>
        <img className="chips-icon" src={chipIcon} alt="Chips" />
      </div>
      <div className="header-logo">
        <img className="logo-image" src={logo} alt="Logo" />
      </div>
      <div className="player-window right">
        <span>{AI.name}</span>
        <span>{AI.chips}</span>
        <img className="chips-icon" src={chipIcon} alt="Chips" />
      </div>
    </div>
  );
};

export default GameHeader;
