import React from 'react';
import { resetPlayerSlice } from '../../store/playerSlice';
import { goToLeaderboard, resetGame } from '../../store/gameSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const GameInfo = () => {
  const game = useAppSelector((store) => store.gameSlice);
  const hand = useAppSelector((store) => store.handSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="game-info">
      {
      game.isLost ? (
        <div>
          <h1>You`re out of chips!</h1>
          <h3>Would you like to swipe your card?</h3>
          <div className="button-wrapper">
            <button
              onClick={() => {
                dispatch(resetPlayerSlice());
                dispatch(resetGame());
              }}
              className="input button"
            >
              SWIPE CARD & CONTINUE
            </button>
            <button
              onClick={() => {
                dispatch(goToLeaderboard());
              }}
              className="input button"
            >
              LEAVE
            </button>
          </div>
        </div>
      )
        : null
    }
      <span>{hand.winner ? hand.winner : null}</span>

    </div>
  );
};

export default GameInfo;
