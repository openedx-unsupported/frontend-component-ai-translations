import { configureStore } from '@reduxjs/toolkit';

export default function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {},
    preloadedState,
  });
}
