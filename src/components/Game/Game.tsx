import React, { useEffect, useState } from 'react';
import './Game.style.scss';
import GameControls, { CardName, cards } from '../GameControls/GameControls';
import GameHeader from '../GameHeader/GameHeader';

import Popup from '../Popup/Popup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addPlayerChips, addTurnCount, removePlayerChips,
} from '../../store/playerSlice';
import {
  setOpponent, setOpponentTableCard, setPlayerTableCard, setTurnDone, setWinner, startNewHand,
} from '../../store/handSlice';
import {
  advanceRound,
  setGameLost, setGameWon,
} from '../../store/gameSlice';
import {
  addAiChips, removeAiChips, removeAiPlayer,
} from '../../store/AiSlice';
import TableItems from '../TableItems/TableItems';
import GameInfo from '../GameInfo/GameInfo';
import { selectRandomOpponent } from '../../App';

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
  const [popup, setPopup] = useState(false);
  const dispatch = useAppDispatch();
  const player = useAppSelector((store) => store.playerSlice);
  const computerPlayer = useAppSelector((store) => store.AiSlice);
  const hand = useAppSelector((store) => store.handSlice);
  const game = useAppSelector((store) => store.gameSlice);
  const playersRemaining = useAppSelector((state) => state.AiSlice
    .filter((item) => !item.disqualified).length) > 0;

  const betAmount = () => {
    const playerChips = player.chips;
    const CPUChips = computerPlayer[hand.activeOpponent as any].chips;
    const bet = game.round * 200;
    return Math.min(playerChips, CPUChips, bet);
  };

  const playerWins = () => {
    dispatch(addPlayerChips(betAmount()));
    dispatch(removeAiChips({ index: hand.activeOpponent, amount: betAmount() }));
  };

  const playerLoses = () => {
    dispatch(removePlayerChips(betAmount()));
    dispatch(addAiChips({ index: hand.activeOpponent, amount: betAmount() }));
  };

  const putOpponentCardOnTable = () => {
    const randomTime = Math.round(Math.random() * 5);
    setTimeout(() => {
      dispatch(setOpponentTableCard(generateOpponentCard()));
    }, randomTime * 1000);
  };

  const updateChipsAndClosePopupAfter3s = (winner: string) => {
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
    }, 4000);
  };

  const openPopupAfter1s = () => {
    setTimeout(() => {
      setPopup(true);
    }, 1000);
  };

  const onSelectCard = (value: CardName) => {
    if (!hand.isTurn || player.chips === 0 || !playersRemaining) {
      return;
    }
    dispatch(setTurnDone());
    dispatch(setPlayerTableCard(value));
    dispatch(addTurnCount());
  };

  useEffect(() => {
    const hasNoChipsOpponent = computerPlayer[hand.activeOpponent as any].chips < 10;
    if (!playersRemaining || game.isLost) {
      dispatch(setGameWon());
    }

    if (hasNoChipsOpponent && playersRemaining) {
      dispatch(removeAiPlayer(hand.activeOpponent));
      dispatch(setOpponent(selectRandomOpponent(computerPlayer)));
      if (hand.pCard && hand.oCard) {
        dispatch(advanceRound());
      }
    }
  }, [computerPlayer[hand.activeOpponent as any]]);

  useEffect(() => {
    const remainingPlayers = computerPlayer.filter((item) => !item.disqualified).length;
    const isOpponentsTurn = hand.isTurn && !hand.oCard;

    if (player.chips < 10 && !game.isLost) {
      dispatch(setGameLost());
    }

    if (isOpponentsTurn && remainingPlayers > 0) {
      putOpponentCardOnTable();
    }

    if (hand.pCard && hand.oCard) {
      const winner = getHandWinner(hand.pCard, hand.oCard);
      dispatch(setWinner(winner));

      openPopupAfter1s();
      updateChipsAndClosePopupAfter3s(winner);
    }
  }, [hand.pCard, hand.oCard]);

  return (
    <div className="game">
      <GameHeader />
      {!game.isLost && <TableItems />}
      <GameInfo />
      <GameControls onCardSelect={onSelectCard} activeCard={hand.pCard} hidden={game.isLost} />
      {popup ? <Popup hand={hand} /> : null}
    </div>
  );
};

export default Game;
