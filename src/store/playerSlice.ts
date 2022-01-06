import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '', age: 18, chips: 2000, turns: 0,
};

export const playerSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

    addTurnCount: (state) => {
      state.turns += 1;
    },
    addPlayerChips: (state, { payload }) => {
      state.chips += +payload;
    },
    removePlayerChips: (state, { payload }) => {
      state.chips -= payload;
    },
    setPlayerName: (state, { payload }) => {
      state.name = payload.name;
      state.age = payload.age;
    },
    resetPlayerSlice: () => initialState,
  },
});

export const {
  addPlayerChips, removePlayerChips, setPlayerName, resetPlayerSlice, addTurnCount,
} = playerSlice.actions;

export default playerSlice.reducer;
