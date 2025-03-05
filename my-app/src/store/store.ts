import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './slices/storeSlice';
import skuReducer from './slices/skuSlice';
import planningReducer from './slices/planningSlice';

const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
  },
});

// Infer types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
