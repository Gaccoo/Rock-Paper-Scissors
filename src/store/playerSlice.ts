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
  },
});
// Action creators are generated for each case reducer function
export const { addPlayerChips, removePlayerChips, setPlayerName } = playerSlice.actions;

export default playerSlice.reducer;
