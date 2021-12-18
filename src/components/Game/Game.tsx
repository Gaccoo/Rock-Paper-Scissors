import React, { useEffect, useRef, useState } from 'react';
import './Game.style.scss';
import Controls, { CardName, cards } from '../Controls/Controls';
import GameHeader from '../GameHeader/GameHeader';
import tableCard from '../../assets/table-card.png';
import Popup from '../Popup/Popup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPlayerChips, removePlayerChips } from '../../store/playerSlice';
import {
  setOpponent, setOpponentTableCard, setPlayerTableCard, setTurnDone, setWinner, startNewHand,
} from '../../store/handSlice';
import { setLost } from '../../store/gameSlice';
import { addAiChips, removeAiChips, removeAiPlayer } from '../../store/AiSlice';

export type HandProps = {
  isTurn: boolean
  pCard: CardName | null
  oCard: CardName | null
  winner: CardName | null | 'Tie'
  AI: {name: string, chips: number}
  isLost: boolean
}

const generateOpponentCard = () => cards[Math.floor(Math.random() * (cards.length - 1))].name;

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

const Game = () => {
  // Redux store items
  const dispatch = useAppDispatch();
  const player = useAppSelector((store) => store.playerSlice);
  const AI = useAppSelector((store) => store.AiSlice);
  const hand = useAppSelector((store) => store.handSlice);
  const game = useAppSelector((store) => store.gameSlice);

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (hand.isTurn && !hand.oCard) {
      const randomTime = Math.round(Math.random() * 5);
      setTimeout(() => {
        dispatch(setOpponentTableCard(generateOpponentCard()));
      }, randomTime * 1000);
    }

    if (hand.pCard && hand.oCard) {
      const winner = getHandWinner(hand.pCard, hand.oCard);
      setTimeout(() => {
        setPopup(true);
        dispatch(setWinner(winner));
      }, 1000);

      setTimeout(() => {
        if (winner === hand.pCard) {
          dispatch(addPlayerChips(10));
          // @ts-ignore
          dispatch(removeAiChips({ index: hand.activeOpponent, amount: 10 }));
        } else if (winner === hand.oCard) {
          if (player.chips - 10 <= 0) {
            dispatch(removePlayerChips(10));
            dispatch(setLost());
            dispatch(addAiChips({ index: hand.activeOpponent, amount: 10 }));
          } else {
            dispatch(removePlayerChips(10));
            dispatch(addAiChips({ index: hand.activeOpponent, amount: 10 }));
          }
        }
        if (!game.isLost) {
          dispatch(startNewHand());
        }

        setPopup(false);
      }, 2000);
    }
  }, [hand.pCard, hand.oCard]);

  const turnHandler = async (value: CardName) => {
    if (!hand.isTurn) {
      return;
    }
    dispatch(setTurnDone());
    if (player.chips > 0) {
      dispatch(setPlayerTableCard(value));
    }
  };
  const closePopup = () => {
    setPopup(false);
  };
  return (
    <div className="game">
      <GameHeader />
      <div className="table-cards">
        {
         hand.pCard ? <img className="pCard" src={tableCard} alt="Card" /> : null
        }

        {
          hand.oCard ? <img className="oCard" src={tableCard} alt="Card" /> : null
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
        <span>{hand.winner ? hand.winner : null}</span>

      </div>
      {
        player.chips < 10 ? null : <Controls onCardSelect={turnHandler} activeCard={hand.pCard} />
      }

      {
        popup ? <Popup hand={hand} onClick={closePopup} /> : null
       }
    </div>
  );
};

export default Game;
