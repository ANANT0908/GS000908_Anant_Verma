import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStores, Store } from '../../data/sampleData';

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: initialStores,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore(state, action: PayloadAction<Omit<Store, 'id'>>) {
      const newId =
        state.stores.length > 0
          ? Math.max(...state.stores.map((s: { id: any; }) => s.id)) + 1
          : 1;
      state.stores.push({ id: newId, ...action.payload });
    },
    updateStore(state, action: PayloadAction<Store>) {
      const idx = state.stores.findIndex((s: { id: any; }) => s.id === action.payload.id);
      if (idx !== -1) {
        state.stores[idx] = action.payload;
      }
    },
    deleteStore(state, action: PayloadAction<number>) {
      state.stores = state.stores.filter((s: { id: number; }) => s.id !== action.payload);
    },
    reorderStoreUp(state, action: PayloadAction<number>) {
      // Move store up in array if possible
      const index = state.stores.findIndex((s: { id: number; }) => s.id === action.payload);
      if (index > 0) {
        const temp = state.stores[index];
        state.stores[index] = state.stores[index - 1];
        state.stores[index - 1] = temp;
      }
    },
    reorderStoreDown(state, action: PayloadAction<number>) {
      // Move store down in array if possible
      const index = state.stores.findIndex((s: { id: number; }) => s.id === action.payload);
      if (index >= 0 && index < state.stores.length - 1) {
        const temp = state.stores[index];
        state.stores[index] = state.stores[index + 1];
        state.stores[index + 1] = temp;
      }
    },
  },
});

export const {
  addStore,
  updateStore,
  deleteStore,
  reorderStoreUp,
  reorderStoreDown,
} = storeSlice.actions;
export default storeSlice.reducer;
