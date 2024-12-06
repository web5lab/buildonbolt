import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
