import React from 'react';
import { resetPlayerSlice } from '../../store/playerSlice';
import { goToLobby, resetGameSlice } from '../../store/gameSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetAiSlice } from '../../store/AiSlice';

const GameInfo = () => {
  const game = useAppSelector((store) => store.gameSlice);
  const dispatch = useAppDispatch();

  return (
    <div className="game-info">
      <div>
        {game.isLost && <h1>You`re out of chips!</h1>}
        {game.isWon && <h1>Congratulations!</h1>}
        {game.isLost && <h3>Better luck next time!</h3>}
        {game.isWon && <h3>You have won the game!</h3>}

        {(game.isLost || game.isWon) && (
        <button
          onClick={() => {
            dispatch(resetPlayerSlice());
            dispatch(resetGameSlice());
            dispatch(resetAiSlice());
            dispatch(goToLobby());
          }}
          className="input button"
        >
          PLAY AGAIN
        </button>
        )}

      </div>
    </div>
  );
};

export default GameInfo;
