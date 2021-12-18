import React, { useEffect, useRef, useState } from 'react';
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
  isLost: boolean
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

const generateOpponentCard = () => cards[Math.floor(Math.random() * (cards.length - 1))].name;
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
  const [game, setGame] = useState<HandProps>({
    isTurn: true, pCard: undefined, oCard: undefined, winner: undefined, AI: selectRandomOpponent(), isLost: false,
  });
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (game.pCard && game.oCard) {
      const winner = getHandWinner(game.pCard, game.oCard);
      setTimeout(() => {
        setPopup(true);
        setGame({ ...game, winner });
      }, 1000);

      setTimeout(() => {
        if (winner === game.pCard) {
          updateChips(addChips(player.chips));
          game.AI.chips -= 10;
        } else if (winner === game.oCard) {
          if (player.chips - 10 <= 0) {
            updateChips(removeChips(player.chips));
            setGame({ ...game, isLost: true });
            game.AI.chips += 10;
          } else {
            updateChips(removeChips(player.chips));
            game.AI.chips += 10;
          }
        }
        if (!game.isLost) {
          setGame({
            ...game,
            isTurn: true,
            pCard: undefined,
            oCard: undefined,
            winner: undefined,
          });
        }

        setPopup(false);
      }, 2000);
    }
  }, [game.pCard, game.oCard]);

  const turnHandler = async (value: CardName) => {
    if (!game.isTurn) {
      return;
    }
    if (player.chips > 0) {
      setGame({
        ...game, pCard: value, isTurn: false, oCard: generateOpponentCard(),
      });
    }
  };
  const closePopup = () => {
    setPopup(false);
  };
  return (
    <div className="game">
      <GameHeader player={player} AI={game.AI} />
      <div className="table-cards">
        {
         game.pCard ? <img className="pCard" src={tableCard} alt="Card" /> : null
        }

        {
          game.oCard ? <img className="oCard" src={tableCard} alt="Card" /> : null
        }

      </div>
      <div className="game-info">
        {
          player.chips < 10 ? (
            <div>
              <h1>You`re out of chips!</h1>
              <div className="button-wrapper">
                <button className="input button">SWIPE CARD & PLAY AGAIN</button>
              </div>
            </div>
          )
            : null
        }
        <span>{game.winner ? game.winner : null}</span>

      </div>
      {
        player.chips < 10 ? null : <Controls onCardSelect={turnHandler} activeCard={game.pCard} />
      }

      {
        popup ? <Popup hand={game} onClick={closePopup} /> : null
       }
    </div>
  );
};

export default Game;
