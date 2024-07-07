
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import countReducer from './countSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    count:countReducer,
  }
})

export type RootState =ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;

