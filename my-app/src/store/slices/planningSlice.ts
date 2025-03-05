import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanningState {
  salesUnits: Record<string, number>; 
}

const initialState: PlanningState = {
  salesUnits: {}, 
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setSalesUnits: (
      state,
      action: PayloadAction<{ storeId: string; skuId: string; week: string; units: number }>
    ) => {console.log(action.payload,"action.payload");

      const { storeId, skuId, week, units } = action.payload;
      const key = `${storeId}_${skuId}_${week}`;
      console.log(key,"key");
      console.log(units,"units");
      state.salesUnits[key] = units;  
    },
  },
});

export const { setSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
