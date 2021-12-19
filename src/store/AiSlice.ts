import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

export type AIPlayer = {
  name: string
  chips: number
  disqualified: boolean
}

const initialState: AIPlayer[] = [
  { name: 'John', chips: 10, disqualified: false },
  { name: 'Elena', chips: 10, disqualified: false },
  { name: 'Mike', chips: 10, disqualified: false },
  { name: 'Stanislav', chips: 10, disqualified: false },
];

export const AiSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addAiChips: (state, { payload }) => {
      state[payload.index].chips += payload.amount;
    },
    removeAiChips: (state, { payload }) => {
      state[payload.index].chips -= payload.amount;
    },
    removeAiPlayer: (state, { payload }) => {
      state[payload].disqualified = true;
    },
    advanceRound: (state) => {
      state.forEach((item, index) => {
        state[index].chips *= 2;
      });
    },
    resetAiSlice: () => initialState,

  },
});
// Action creators are generated for each case reducer function
export const {
  addAiChips, removeAiChips, removeAiPlayer, advanceRound, resetAiSlice,
} = AiSlice.actions;

export default AiSlice.reducer;
