import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

const initialState = { name: '', age: 18, chips: 10 };

export const playerSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
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
    resetPlayerSlice: (state) => {
      state.chips = initialState.chips;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  addPlayerChips, removePlayerChips, setPlayerName, resetPlayerSlice,
} = playerSlice.actions;

export default playerSlice.reducer;
