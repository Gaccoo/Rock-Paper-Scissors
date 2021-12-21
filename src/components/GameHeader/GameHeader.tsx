import React from 'react';
import './GameHeader-style.scss';
import chipIcon from '../../assets/chip-icon.png';
import logo from '../../assets/poker-logo-white.png';
import { useAppSelector } from '../../store/hooks';

const GameHeader = () => {
  const player = useAppSelector((store) => store.playerSlice);
  const opponentIndex = useAppSelector((store) => store.handSlice.activeOpponent);
  const opponent = useAppSelector((store) => store.AiSlice[opponentIndex as any]);
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
        <span>{opponent ? opponent.name : ''}</span>
        <span>{opponent ? opponent.chips : ''}</span>
        <img className="chips-icon" src={chipIcon} alt="Chips" />
      </div>
    </div>
  );
};

export default GameHeader;
