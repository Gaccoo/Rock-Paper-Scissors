import { configureStore } from '@reduxjs/toolkit';
import playerSlice from './playerSlice';
import AiSlice from './AiSlice';
import gameSlice from './gameSlice';
import handSlice from './handSlice';

const store = configureStore({
  reducer: {
    gameSlice,
    playerSlice,
    AiSlice,
    handSlice,

  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
