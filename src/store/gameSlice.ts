import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

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
// Action creators are generated for each case reducer function
export const {
  goToGame, goToLobby, advanceRound, setGameLost, resetGameSlice, setGameWon,
} = gameSlice.actions;

export default gameSlice.reducer;
