import { createSlice } from '@reduxjs/toolkit';

export type GameState = 'Lobby' | 'Game'

export type State = {
  gameState: GameState
  isLost: boolean
  isWon: boolean
  round: number
}

const initialState = {
  gameState: 'Lobby', isLost: false, isWon: false, round: 1,
} as State;

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    goToGame: (state) => {
      state.gameState = 'Game';
    },
    goToLobby: (state) => {
      state.gameState = 'Lobby';
    },
    advanceRound: (state) => {
      state.round += 1;
    },
    setGameLost: (state) => {
      state.isLost = true;
    },
    setGameWon: (state) => {
      state.isWon = true;
    },
    resetGameSlice: () => initialState,

  },
});

export const {
  goToGame, goToLobby, advanceRound, setGameLost, resetGameSlice, setGameWon,
} = gameSlice.actions;

export default gameSlice.reducer;
