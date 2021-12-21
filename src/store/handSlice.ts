import { createSlice } from '@reduxjs/toolkit';
import { CardName } from '../components/GameControls/GameControls';
// Define a type for the slice state

export type HandProps = {
  isTurn: boolean
  pCard: CardName | null
  oCard: CardName | null
  winner: CardName | null | 'Tie'
  activeOpponent: number | null
}

const initialState: HandProps = {
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
