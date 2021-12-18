import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state

export type AIPlayer = {
  name: string
  chips: number
}

const initialState: AIPlayer[] = [
  { name: 'John', chips: 100 },
  { name: 'Elena', chips: 100 },
  { name: 'Mike', chips: 100 },
  { name: 'Stanislav', chips: 100 },
  { name: 'Muhamed', chips: 100 },
  { name: 'Eva', chips: 100 },
  { name: 'Oliver', chips: 100 },
  { name: 'Hue', chips: 100 },
  { name: 'Adam', chips: 100 },
  { name: 'Lisa', chips: 100 },
  { name: 'Maria', chips: 100 },
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
      console.log('AI PLAYER DISQUALIFIED');
    },
  },
});
// Action creators are generated for each case reducer function
export const { addAiChips, removeAiChips, removeAiPlayer } = AiSlice.actions;

export default AiSlice.reducer;
