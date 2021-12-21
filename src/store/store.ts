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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
