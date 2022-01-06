import { createSlice } from '@reduxjs/toolkit';

export type AIPlayer = {
  name: string
  chips: number
  disqualified: boolean
}

const initialState: AIPlayer[] = [
  { name: 'John', chips: 16000, disqualified: false },
  { name: 'Elena', chips: 8000, disqualified: false },
  { name: 'Mike', chips: 4000, disqualified: false },
  { name: 'Stanislav', chips: 2000, disqualified: false },
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

    resetAiSlice: () => initialState,

  },
});

export const {
  addAiChips, removeAiChips, removeAiPlayer, resetAiSlice,
} = AiSlice.actions;

export default AiSlice.reducer;
