import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

export type GameState = 'Lobby' | 'Game' | 'Leaderboard'

const initialState = {
  gameState: 'Lobby', isLost: false, isWon: false,
};

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    goToGame: (state) => {
      state.gameState = 'Game';
    },
    goToLeaderboard: (state) => {
      state.gameState = 'Leaderboard';
    },
    goToLobby: (state) => {
      state.gameState = 'Lobby';
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
  goToGame, goToLeaderboard, goToLobby, setGameLost, resetGameSlice, setGameWon,
} = gameSlice.actions;

export default gameSlice.reducer;
