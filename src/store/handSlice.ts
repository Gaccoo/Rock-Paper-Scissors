import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

const initialState = {
  isTurn: true, pCard: null, oCard: null, winner: null, activeOpponent: null,
};

export const handSlice = createSlice({
  name: 'handSlice',
  initialState,
  reducers: {
    startNewHand: (state) => {
      state.isTurn = true;
      state.pCard = null;
      state.oCard = null;
      state.winner = null;
    },
    setWinner: (state, { payload }) => {
      state.winner = payload;
    },
    setPlayerTableCard: (state, { payload }) => {
      state.pCard = payload;
    },
    setOpponentTableCard: (state, { payload }) => {
      state.oCard = payload;
    },
    setOpponent: (state, { payload }) => {
      state.activeOpponent = payload;
    },
    setTurnDone: (state) => {
      state.isTurn = false;
    },
    setTurnUndone: (state) => {
      state.isTurn = true;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  startNewHand, setWinner, setPlayerTableCard, setOpponentTableCard, setOpponent, setTurnDone, setTurnUndone,
} = handSlice.actions;

export default handSlice.reducer;
