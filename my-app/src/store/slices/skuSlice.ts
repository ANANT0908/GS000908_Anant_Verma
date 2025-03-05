import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialSKUs, SKU } from '../../data/sampleData';

interface SkuState {
  skus: SKU[];
}

const initialState: SkuState = {
  skus: initialSKUs,
};

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU(state, action: PayloadAction<Omit<SKU, 'id'>>) {
      const newId = state.skus.length > 0
        ? Math.max(...state.skus.map((sku: { id: any; }) => sku.id)) + 1
        : 1;
      state.skus.push({ id: newId, ...action.payload });
    },
    updateSKU(state, action: PayloadAction<SKU>) {
      const idx = state.skus.findIndex((s: { id: any; }) => s.id === action.payload.id);
      if (idx !== -1) {
        state.skus[idx] = action.payload;
      }
    },
    deleteSKU(state, action: PayloadAction<number>) {
      state.skus = state.skus.filter((s: { id: number; }) => s.id !== action.payload);
    },
  },
});

export const { addSKU, updateSKU, deleteSKU } = skuSlice.actions;
export default skuSlice.reducer;
