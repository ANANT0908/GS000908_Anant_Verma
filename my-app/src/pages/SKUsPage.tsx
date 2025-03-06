import React, { useState, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addSKU, deleteSKU, updateSKU } from "../store/slices/skuSlice";

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

export default function SKUsPage() {
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state) => state.skus.skus);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState<SKU | null>(null);
  const [skuData, setSkuData] = useState({ name: "", price: "", cost: "" });

  const handleDelete = (id: number) => dispatch(deleteSKU(id));

  const handleOpenDialog = (sku?: SKU) => {
    if (sku) {
      setEditMode(true);
      setSelectedSKU(sku);
      setSkuData({
        name: sku.name,
        price: sku.price.toString(),
        cost: sku.cost.toString(),
      });
    } else {
      setEditMode(false);
      setSkuData({ name: "", price: "", cost: "" });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSKU(null);
  };

  const handleSaveSKU = () => {
    if (!skuData.name.trim()) return;

    const formattedData = {
      name: skuData.name.trim(),
      price: parseFloat(skuData.price) || 0,
      cost: parseFloat(skuData.cost) || 0,
    };

    if (editMode && selectedSKU) {
      dispatch(updateSKU({ id: selectedSKU.id, ...formattedData }));
    } else {
      dispatch(addSKU(formattedData));
    }

    handleCloseDialog();
  };

  const columnDefs: any[] = useMemo(
    () => [
      {
        headerName: "",
        field: "actions",
        width: 120,
        cellRenderer: (params: any) => (
          <>
            <IconButton size="small" onClick={() => handleOpenDialog(params.data)}>
              <Edit />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(params.data.id)}>
              <Delete />
            </IconButton>
          </>
        ),
        sortable: false,
        filter: false,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "name",
        headerName: "SKU",
        flex: 1,
        cellStyle: { paddingLeft: "12px", fontWeight: "500" },
      },
      {
        field: "price",
        headerName: "Price",
        flex: 1,
        valueFormatter: (params: any) => `$ ${params.value.toFixed(2)}`,
        cellStyle: { textAlign: "right", paddingRight: "10px" },
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        valueFormatter: (params: any) => `$ ${params.value.toFixed(2)}`,
        cellStyle: { textAlign: "right", paddingRight: "10px" },
      },
    ],
    [skus]
  );

  return (
    <>
     

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%", marginBottom:"12px" }}>
        <AgGridReact
          rowData={skus}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          rowHeight={55}
          headerHeight={60}
          className="custom-ag-grid"
        />
      </div>
      <Button
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{
          marginBottom: 2,
          backgroundColor: "#f3905f",
          ":hover": { backgroundColor: "#f16529" },
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "10px 20px",
        }}
      >
        ADD SKU
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          {editMode ? "Update SKU" : "Add New SKU"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
          <TextField
            placeholder="SKU Name"
            value={skuData.name}
            onChange={(e) => setSkuData({ ...skuData, name: e.target.value })}
          />
          <TextField
            placeholder="Price ($)"
            type="number"
            value={skuData.price}
            onChange={(e) => setSkuData({ ...skuData, price: e.target.value })}
          />
          <TextField
            placeholder="Cost ($)"
            type="number"
            value={skuData.cost}
            onChange={(e) => setSkuData({ ...skuData, cost: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "gray", fontWeight: "500" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveSKU}
            sx={{
              backgroundColor: "#4CAF50",
              ":hover": { backgroundColor: "#388E3C" },
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            {editMode ? "Update SKU" : "Add SKU"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
