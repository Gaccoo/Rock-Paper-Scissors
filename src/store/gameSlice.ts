import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

export type GameState = 'Lobby' | 'Game' | 'Leaderboard'

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState: { gameState: 'Lobby', isLost: false },
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
    resetGame: (state) => {
      state.isLost = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  goToGame, goToLeaderboard, goToLobby, setGameLost, resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
