import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addSKU, deleteSKU } from "../store/slices/skuSlice";

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
  const [newSKU, setNewSKU] = useState({ name: "", price: "", cost: "" });

  const handleDelete = (id: number) => {
    dispatch(deleteSKU(id));
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewSKU({ name: "", price: "", cost: "" });
  };

  const handleAddSKU = () => {
    if (!newSKU.name.trim()) return;
    const skuData = {
      name: newSKU.name.trim(),
      price: parseFloat(newSKU.price) || 0,
      cost: parseFloat(newSKU.cost) || 0,
    };
    dispatch(addSKU(skuData));
    handleCloseDialog();
  };

  const columnDefs: any[] = useMemo(
    () => [
      {
        headerName: "",
        field: "delete",
        width: 80,
        cellRenderer: (params: any) => (
          <IconButton size="small" onClick={() => handleDelete(params.data.id)}>
            <Delete />
          </IconButton>
        ),
        sortable: false,
        filter: false,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "name",
        headerName: "SKU Name",
        flex: 1,
        cellStyle: { paddingLeft: "12px", fontWeight: "500" },
      },
      {
        field: "price",
        headerName: "Price ($)",
        flex: 1,
        valueFormatter: (params: any): string => `$ ${params.value.toFixed(2)}`,
        cellStyle: { textAlign: "right", paddingRight: "10px" },
      },
      {
        field: "cost",
        headerName: "Cost ($)",
        flex: 1,
        valueFormatter: (params: any): string => `$ ${params.value.toFixed(2)}`,
        cellStyle: { textAlign: "right", paddingRight: "10px" },
      },
    ],
    [skus]
  );

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
        <AgGridReact
          rowData={skus}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          rowHeight={55}
        />
      </div>

      <Button
        variant="contained"
        onClick={handleOpenDialog}
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#f3905f",
          ":hover": { backgroundColor: "#f16529" },
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
          padding: "12px 24px",
        }}
      >
        ADD SKU
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#333",
          }}
        >
          Add New SKU
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            minWidth: 350,
          }}
        >
          <TextField
            label="SKU Name"
            value={newSKU.name}
            onChange={(e) => setNewSKU({ ...newSKU, name: e.target.value })}
            fullWidth
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <TextField
            label="Price ($)"
            type="number"
            value={newSKU.price}
            onChange={(e) => setNewSKU({ ...newSKU, price: e.target.value })}
            fullWidth
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <TextField
            label="Cost ($)"
            type="number"
            value={newSKU.cost}
            onChange={(e) => setNewSKU({ ...newSKU, cost: e.target.value })}
            fullWidth
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "gray", fontWeight: "500" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddSKU}
            sx={{
              backgroundColor: "#4CAF50",
              ":hover": { backgroundColor: "#388E3C" },
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            Add SKU
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
