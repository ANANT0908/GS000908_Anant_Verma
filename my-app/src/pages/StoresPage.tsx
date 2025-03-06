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
import { addStore, deleteStore, updateStore } from "../store/slices/storeSlice";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

export default function StoresPage() {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state) => state.stores.stores);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [storeData, setStoreData] = useState({ name: "", city: "", state: "" });

  const handleDelete = (id: number) => dispatch(deleteStore(id));

  const handleOpenDialog = (store?: Store) => {
    if (store) {
      setEditMode(true);
      setSelectedStore(store);
      setStoreData({
        name: store.name,
        city: store.city,
        state: store.state,
      });
    } else {
      setEditMode(false);
      setStoreData({ name: "", city: "", state: "" });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStore(null);
  };

  const handleSaveStore = () => {
    if (!storeData.name.trim()) return;

    if (editMode && selectedStore) {
      dispatch(updateStore({ id: selectedStore.id, ...storeData }));
    } else {
      dispatch(addStore(storeData));
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
        headerName: "Store Name",
        flex: 1,
        cellStyle: { paddingLeft: "12px", fontWeight: "500" },
      },
      {
        field: "city",
        headerName: "City",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "state",
        headerName: "State",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
    ],
    [stores]
  );

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%", marginBottom: "12px" }}>
        <AgGridReact
          rowData={stores}
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
        ADD STORE
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          {editMode ? "Update Store" : "Add New Store"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
          <TextField
            placeholder="Store Name"
            value={storeData.name}
            onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
          />
          <TextField
            placeholder="City"
            value={storeData.city}
            onChange={(e) => setStoreData({ ...storeData, city: e.target.value })}
          />
          <TextField
            placeholder="State"
            value={storeData.state}
            onChange={(e) => setStoreData({ ...storeData, state: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "gray", fontWeight: "500" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveStore}
            sx={{
              backgroundColor: "#4CAF50",
              ":hover": { backgroundColor: "#388E3C" },
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            {editMode ? "Update Store" : "Add Store"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
