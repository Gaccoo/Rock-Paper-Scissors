import React, { useEffect, useState } from 'react';
import './Game.style.scss';
import Controls, { CardName, cards } from '../Controls/Controls';
import GameHeader from '../GameHeader/GameHeader';
import { Player } from '../../App';
import tableCard from '../../assets/table-card.png';
import Popup from '../Popup/Popup';

type AppProps = {
  player: Player
  updateChips: (value: number) => void
}

export type HandProps = {
  isTurn: boolean
  pCard: CardName | undefined
  oCard: CardName | undefined
  winner: CardName | undefined | 'Tie'
  AI: {name: string, chips: number}
}

const playersAI = [
  { name: 'John', chips: 100 },
  { name: 'Elena', chips: 100 },
  { name: 'Mike', chips: 100 },
  { name: 'Stanislav', chips: 100 },
  { name: 'Muhamed', chips: 100 },
  { name: 'Eva', chips: 100 },
  { name: 'Oliver', chips: 100 },
  { name: 'Hue', chips: 100 },
  { name: 'Adam', chips: 100 },
  { name: 'Lisa', chips: 100 },
  { name: 'Maria', chips: 100 },
];

const generateOpponentCard = () => cards[Math.floor(Math.random() * (cards.length))].name;
const selectRandomOpponent = () => playersAI[Math.floor(Math.random() * playersAI.length)];

const getHandWinner = (pCard: CardName, oCard: CardName) => {
  const playerCard = cards.find((card) => card.name === pCard);
  const opponentCard = cards.find((card) => card.name === oCard);
  if (playerCard?.beats.includes(oCard)) {
    return pCard;
  }
  if (opponentCard?.beats.includes(pCard)) {
    return oCard;
  }
  return 'Tie';
};

const addChips = (chipCount: number) => chipCount + 10;
const removeChips = (chipCount: number) => chipCount - 10;

const Game = ({ player, updateChips }: AppProps) => {
  const [hand, setHand] = useState<HandProps>({
    isTurn: true, pCard: undefined, oCard: undefined, winner: undefined, AI: selectRandomOpponent(),
  });
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (hand.pCard && hand.oCard) {
      const winner = getHandWinner(hand.pCard, hand.oCard);
      setTimeout(() => {
        setPopup(true);
        setHand({ ...hand, winner });
      }, 1000);

      setTimeout(() => {
        if (winner === hand.pCard) {
          updateChips(addChips(player.chips));
          hand.AI.chips -= 10;
        } else if (winner === hand.oCard) {
          updateChips(removeChips(player.chips));
          hand.AI.chips += 10;
        }
        setHand({
          ...hand,
          isTurn: true,
          pCard: undefined,
          oCard: undefined,
          winner: undefined,
        });
        setPopup(false);
      }, 5000);
    }
  }, [hand.pCard, hand.oCard]);

  const turnHandler = async (value: CardName) => {
    if (!hand.isTurn) {
      return;
    }
    setHand({
      ...hand, pCard: value, isTurn: false, oCard: generateOpponentCard(),
    });
  };
  const closePopup = () => {
    setPopup(false);
  };
  return (
    <div className="game">
      <GameHeader player={player} AI={hand.AI} />
      <div className="table-cards">
        {
         hand.pCard ? <img className="pCard" src={tableCard} alt="Card" /> : null
        }

        {
          hand.oCard ? <img className="oCard" src={tableCard} alt="Card" /> : null
        }

      </div>
      <div className="game-info">

        <span>{hand.winner ? hand.winner : null}</span>

      </div>
      <Controls onCardSelect={turnHandler} activeCard={hand.pCard} />

      {
        popup ? <Popup hand={hand} onClick={closePopup} /> : null
       }
    </div>
  );
};

export default Game;
