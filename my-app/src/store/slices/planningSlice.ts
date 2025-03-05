import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialPlanningData, PlanningData } from '../../data/sampleData';

interface UpdateSalesUnitsPayload {
  storeId: number;
  skuId: number;
  week: string; // e.g. 'W01'
  units: number;
}

interface PlanningState {
  salesUnits: PlanningData; 
}

const initialState: PlanningState = {
  salesUnits: initialPlanningData,
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setSalesUnits(state, action: PayloadAction<UpdateSalesUnitsPayload>) {
      const { storeId, skuId, week, units } = action.payload;
      const key = `${storeId}_${skuId}_${week}`;
      state.salesUnits[key] = units;
    },
    importSampleData(state, action: PayloadAction<PlanningData>) {
      // Overwrite or merge with existing
      state.salesUnits = { ...state.salesUnits, ...action.payload };
    },
  },
});

export const { setSalesUnits, importSampleData } = planningSlice.actions;
export default planningSlice.reducer;
