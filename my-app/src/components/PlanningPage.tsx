import React, { useState, useMemo, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { setSalesUnits } from "../store/slices/planningSlice";
import { Store } from "../data/sampleData";
import { SKU } from "../data/sampleData";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const WEEKS = ["W01", "W02"];

const PlanningPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state: any) => state.stores.stores);
  const skus = useAppSelector((state: any) => state.skus.skus);
  const planningData = useAppSelector((state: any) => state.planning.salesUnits);

  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    const rows: Array<{ id: string; store: Store; sku: SKU }> = [];
    stores.forEach((store: any) => {
      skus.forEach((sku: any) => {
        rows.push({
          id: `${store.id}_${sku.id}`,
          store,
          sku,
          ...WEEKS.reduce((acc, week) => {
            acc[`${week}_units`] = planningData[`${store.id}_${sku.id}_${week}`] || 0;
            return acc;
          }, {} as Record<string, number>)
        });
      });
    });

    setRowData(rows);
  }, [stores, skus, planningData]);

  const onCellValueChanged = useCallback((params: any) => {
    const { data, colDef, newValue } = params;
    const { store, sku } = data;
    const week = colDef.field.replace("_units", ""); 

    if (!week || isNaN(parseFloat(newValue))) return;

    const updatedValue = parseFloat(newValue);

    setRowData((prevData) =>
      prevData.map((row) =>
        row.id === data.id ? { ...row, [`${week}_units`]: updatedValue } : row
      )
    );

    dispatch(setSalesUnits({ storeId: store.id, skuId: sku.id, week, units: updatedValue }));
  }, [dispatch]);

  const columnDefs: any = useMemo(() => {
    
    const baseCols = [
      {
        headerName: "Store",
        valueGetter: (params: any) => params.data.store.name,
        pinned: "left",
        width: 200,
        editable: false,
      },
      {
        headerName: "SKU",
        valueGetter: (params: any) => params.data.sku.name,
        pinned: "left",
        width: 200,
        editable: false,
      },
    ];

    const weekCols = WEEKS.map((week) => {
      return [
        {
          headerName: `${week} Sales Units`,
          field: `${week}_units`,
          editable: true,
          width: 120,
        },
        {
          headerName: `${week} Sales Dollars`,
          field: `${week}_salesDollars`,
          width: 130,
          valueGetter: (params: any) => {
            const { sku } = params.data;
            return params.data[`${week}_units`] * sku.price;
          },
          valueFormatter: (params: any) => `$ ${params.value?.toFixed(2) || "0.00"}`,
        },
      ];
    });

    return [...baseCols, ...weekCols.flat()];
  }, [WEEKS]);

  const defaultColDef = useMemo(() => ({
    editable: true,
    resizable: true,
  }), []);
console.log("rowData",{rowData},
  "columnDefs",{columnDefs},
  "defaultColDef",{defaultColDef});
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <h2>Planning</h2>
      <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default PlanningPage;
