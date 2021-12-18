import React, { useEffect, useRef, useState } from 'react';
import './Game.style.scss';
import Controls, { CardName, cards } from '../Controls/Controls';
import GameHeader from '../GameHeader/GameHeader';
import tableCard from '../../assets/table-card.png';
import Popup from '../Popup/Popup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPlayerChips, removePlayerChips, resetPlayerSlice } from '../../store/playerSlice';
import {
  setOpponent, setOpponentTableCard, setPlayerTableCard, setTurnDone, setWinner, startNewHand,
} from '../../store/handSlice';
import { resetGame, setGameLost } from '../../store/gameSlice';
import { addAiChips, removeAiChips, removeAiPlayer } from '../../store/AiSlice';
import TableCards from '../TableCards';
import GameInfo from '../GameInfo/GameInfo';
import { selectRandomOpponent } from '../../App';

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

  const playerWins = () => {
    dispatch(addPlayerChips(10));
    dispatch(removeAiChips({ index: hand.activeOpponent, amount: 10 }));
  };

  const playerLoses = () => {
    dispatch(removePlayerChips(10));
    dispatch(addAiChips({ index: hand.activeOpponent, amount: 10 }));
  };

  const putOpponentCardOnTable = () => {
    const randomTime = Math.round(Math.random() * 5);
    setTimeout(() => {
      dispatch(setOpponentTableCard(generateOpponentCard()));
    }, randomTime * 1000);
  };

  useEffect(() => {
    const isOpponentsTurn = hand.isTurn && !hand.oCard;

    if (player.chips < 10) {
      dispatch(setGameLost());
    }

    if (AI[hand.activeOpponent as any].chips < 10) {
      dispatch(removeAiPlayer(hand.activeOpponent));
      dispatch(setOpponent(selectRandomOpponent(AI)));
    }

    if (isOpponentsTurn) {
      putOpponentCardOnTable();
    }

    if (hand.pCard && hand.oCard) {
      const winner = getHandWinner(hand.pCard, hand.oCard);
      dispatch(setWinner(winner));

      setTimeout(() => {
        setPopup(true);
      }, 1000);

      setTimeout(() => {
        if (winner === hand.pCard) {
          playerWins();
        } else if (winner === hand.oCard) {
          playerLoses();
        }
        if (!game.isLost) {
          dispatch(startNewHand());
        }

        setPopup(false);
      }, 3000);
    }
  }, [hand.pCard, hand.oCard]);

  const playerTurnHandler = async (value: CardName) => {
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

      {
        !game.isLost && <TableCards />
      }

      <GameInfo />

      <Controls onCardSelect={playerTurnHandler} activeCard={hand.pCard} hidden={game.isLost} />

      {
        popup ? <Popup hand={hand} onClick={closePopup} /> : null
       }
    </div>
  );
};

export default Game;
