import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './fileSlice';

export const rootReducer = combineReducers({
  appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
