import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { setSalesUnits } from '../store/slices/planningSlice';
import { Store } from '../data/sampleData';
import { SKU } from '../data/sampleData';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const WEEKS = ['W01', 'W02']; // add more as needed

const PlanningPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state:any) => state.stores.stores);
  const skus = useAppSelector((state:any) => state.skus.skus);
  const planningData = useAppSelector((state:any) => state.planning.salesUnits);

  // Create row data by cross-joining stores × SKUs
  const rowData = useMemo(() => {
    const rows: Array<{
      id: string; // unique row ID
      store: Store;
      sku: SKU;
    }> = [];
    stores.forEach((store:any) => {
      skus.forEach((sku:any) => {
        rows.push({
          id: `${store.id}_${sku.id}`,
          store,
          sku,
        });
      });
    });
    return rows;
  }, [stores, skus]);

  // Column definitions
  const columnDefs:any = useMemo(() => {
    // Some base columns
    const baseCols = [
      {
        headerName: 'Store',
        valueGetter: (params: any) => params.data.store.name,
        pinned: 'left',
        width: 200,
      },
      {
        headerName: 'SKU',
        valueGetter: (params: any) => params.data.sku.name,
        pinned: 'left',
        width: 200,
      },
    ];

    // For each week, we have 4 columns:
    //  1) Sales Units (editable)
    //  2) Sales Dollars (computed)
    //  3) GM Dollars (computed)
    //  4) GM Percent (computed + conditional background)
    const weekCols = WEEKS.map((week) => {
      return [
        {
          headerName: `${week} Sales Units`,
          field: `${week}_units`,
          editable: true,
          width: 120,
          valueGetter: (params: any) => {
            const { store, sku } = params.data;
            const key = `${store.id}_${sku.id}_${week}`;
            return planningData[key] || 0;
          },
          valueSetter: (params: any) => {
            const { store, sku } = params.data;
            const newVal = parseFloat(params.newValue) || 0;
            dispatch(
              setSalesUnits({
                storeId: store.id,
                skuId: sku.id,
                week,
                units: newVal,
              })
            );
            return true; // allow AG-Grid to set
          },
        },
        {
          headerName: `${week} Sales Dollars`,
          field: `${week}_salesDollars`,
          width: 130,
          valueGetter: (params: any) => {
            const { store, sku } = params.data;
            const key = `${store.id}_${sku.id}_${week}`;
            const units = planningData[key] || 0;
            return units * sku.price;
          },
          valueFormatter: (params: any) =>
            `$ ${params.value?.toFixed(2) || '0.00'}`,
        },
        {
          headerName: `${week} GM Dollars`,
          field: `${week}_gmDollars`,
          width: 130,
          valueGetter: (params: any) => {
            const { store, sku } = params.data;
            const key = `${store.id}_${sku.id}_${week}`;
            const units = planningData[key] || 0;
            const salesDollars = units * sku.price;
            const costDollars = units * sku.cost;
            return salesDollars - costDollars;
          },
          valueFormatter: (params: any) =>
            `$ ${params.value?.toFixed(2) || '0.00'}`,
        },
        {
          headerName: `${week} GM Percent`,
          field: `${week}_gmPercent`,
          width: 120,
          valueGetter: (params: any) => {
            const { store, sku } = params.data;
            const key = `${store.id}_${sku.id}_${week}`;
            const units = planningData[key] || 0;
            const salesDollars = units * sku.price;
            const gmDollars = salesDollars - units * sku.cost;
            if (salesDollars === 0) return 0;
            return (gmDollars / salesDollars) * 100;
          },
          valueFormatter: (params: any):string =>
            `${params.value?.toFixed(2) || '0.00'} %`,
          cellStyle: (params: any) => {
            const val = params.value || 0;
            if (val >= 40) {
              return { backgroundColor: '#8BC34A', color: '#000' }; // Green
            } else if (val >= 10) {
              return { backgroundColor: '#FFEB3B', color: '#000' }; // Yellow
            } else if (val > 5) {
              return { backgroundColor: 'orange', color: '#000' };
            } else {
              return { backgroundColor: 'red', color: '#fff' };
            }
          },
        },
      ];
    });

    return [...baseCols, ...weekCols.flat()];
  }, [WEEKS, planningData, dispatch]);

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <h2>Planning</h2>
      <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true }}
        />
      </div>
    </div>
  );
};

export default PlanningPage;
