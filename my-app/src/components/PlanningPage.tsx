import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const PlanningPage: React.FC = () => {
  const [rowData, setRowData] = useState([
    { store: "NY Fashion Hub", sku: "Classic Leather Jacket", price: 120, cost: 50, week1SalesUnits: 100, week2SalesUnits: 50 },
    { store: "LA Streetwear", sku: "Graphic T-Shirt", price: 30, cost: 20, week1SalesUnits: 80, week2SalesUnits: 120 },
    { store: "Texas Casuals", sku: "Denim Jeans", price: 70, cost: 40, week1SalesUnits: 60, week2SalesUnits: 90 },
    { store: "Chicago Charm Boutique", sku: "Floral Dress", price: 150, cost: 40, week1SalesUnits: 200, week2SalesUnits: 220 },
    { store: "Miami Beachwear", sku: "Summer Shorts", price: 35, cost: 30, week1SalesUnits: 50, week2SalesUnits: 100 },
    { store: "Seattle Outfits", sku: "Winter Coat", price: 200, cost: 100, week1SalesUnits: 10, week2SalesUnits: 30 },
    { store: "Vegas Trends", sku: "Party Blazer", price: 80, cost: 60, week1SalesUnits: 90, week2SalesUnits: 60 },
    { store: "Denver Outdoors", sku: "Hiking Boots", price: 150, cost: 120, week1SalesUnits: 40, week2SalesUnits: 70 },
    { store: "NY Fashion Hub", sku: "Classic Leather Jacket", price: 120, cost: 50, week1SalesUnits: 100, week2SalesUnits: 50 },
  
  ]);

  const calculateValues = (params: any, type: string) => {
    const { data } = params;
    const salesDollars = data[type] * data.price;
    const gmDollars = salesDollars - data[type] * data.cost;
    const gmPercent = salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
    return { salesDollars, gmDollars, gmPercent };
  };

  const getGMColor = (gmPercent: number) => {
    if (gmPercent >= 40) return "#4CAF50"; 
    if (gmPercent >= 10) return "#FFEB3B"; 
    if (gmPercent >= 5) return "#FF9800"; 
    return "#F44336"; 
  };

  const columnDefs: ColDef[] = useMemo(() => [
    { field: "store", headerName: "Store", pinned: "left", width: 170 },
    { field: "sku", headerName: "SKU", pinned: "left", width: 175 },
    {
      headerName: "February",
      children: [
        {
          headerName: "Week 01",
          children: [
            {
              field: "week1SalesUnits",
              headerName: "Sales Units",
              editable: true,
              width: 100,
              valueParser: (params: any) => Number(params.newValue) || 0,
            },
            {
              headerName: "Sales Dollars",
              width: 120,
              valueGetter: (params: any) => "$" + calculateValues(params, "week1SalesUnits").salesDollars.toFixed(2),
            },
            {
              headerName: "GM Dollars",
              width: 120,
              valueGetter: (params: any) => "$" + calculateValues(params, "week1SalesUnits").gmDollars.toFixed(2),
            },
            {
              headerName: "GM Percent",
              width: 120,
              valueGetter: (params: any) => calculateValues(params, "week1SalesUnits").gmPercent.toFixed(2) + " %",
              cellStyle: (params: any) => ({
                backgroundColor: getGMColor(parseFloat(params.value)),
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }),
            },
          ],
        },
        {
          headerName: "Week 02",
          children: [
            {
              field: "week2SalesUnits",
              headerName: "Sales Units",
              editable: true,
              width: 100,
              valueParser: (params) => Number(params.newValue) || 0,
            },
            {
              headerName: "Sales Dollars",
              width: 120,
              valueGetter: (params) => "$" + calculateValues(params, "week2SalesUnits").salesDollars.toFixed(2),
            },
            {
              headerName: "GM Dollars",
              width: 120,
              valueGetter: (params) => "$" + calculateValues(params, "week2SalesUnits").gmDollars.toFixed(2),
            },
            {
              headerName: "GM Percent",
              width: 120,
              valueGetter: (params) => calculateValues(params, "week2SalesUnits").gmPercent.toFixed(2) + " %",
              cellStyle: (params) => ({
                backgroundColor: getGMColor(parseFloat(params.value)),
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }),
            },
          ],
        },
      ],
    },
  ], []);

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: "570px", width: "100%", margin: "0 auto" }}>
        <AgGridReact 
          rowData={rowData} 
          columnDefs={columnDefs} 
          defaultColDef={{ resizable: true }} 
          rowModelType="clientSide" 
          getRowHeight={() => 50}
        />
      </div>
    </div>
  );
};

export default PlanningPage;
