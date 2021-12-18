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
  { name: 'Muhamed', chips: 10, disqualified: false },
  { name: 'Eva', chips: 10, disqualified: false },
  { name: 'Oliver', chips: 10, disqualified: false },
  { name: 'Hue', chips: 10, disqualified: false },
  { name: 'Adam', chips: 10, disqualified: false },
  { name: 'Lisa', chips: 10, disqualified: false },
  { name: 'Hernandez', chips: 10, disqualified: false },
  { name: 'Patricia', chips: 10, disqualified: false },
  { name: 'Mercedes', chips: 10, disqualified: false },
  { name: 'Lola', chips: 10, disqualified: false },
  { name: 'Anthony', chips: 10, disqualified: false },
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
      state.splice(payload, 1);
    },
  },
});
// Action creators are generated for each case reducer function
export const { addAiChips, removeAiChips, removeAiPlayer } = AiSlice.actions;

export default AiSlice.reducer;
