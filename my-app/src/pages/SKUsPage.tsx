import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

const initialSKUs: SKU[] = [
  { id: 1, name: "Product A", price: 100, cost: 70 },
  { id: 2, name: "Product B", price: 150, cost: 90 },
  { id: 3, name: "Product C", price: 200, cost: 120 },
];

export default function SKUsPage() {
  const [skus, setSKUs] = useState<SKU[]>(initialSKUs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSKU, setNewSKU] = useState({ name: "", price: "", cost: "" });

  const handleDelete = (id: number) => {
    setSKUs((prev) => prev.filter((sku) => sku.id !== id));
  };



  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewSKU({ name: "", price: "", cost: "" });
  };

  const handleAddSKU = () => {
    if (!newSKU.name.trim()) return;
    const newId = skus.length > 0 ? Math.max(...skus.map((s) => s.id)) + 1 : 1;
    const sku: SKU = {
      id: newId,
      name: newSKU.name.trim(),
      price: parseFloat(newSKU.price) || 0,
      cost: parseFloat(newSKU.cost) || 0,
    };
    setSKUs([...skus, sku]);
    handleCloseDialog();
  };

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      <h2 style={{ margin: "16px 0" }}>SKU Management</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f7f8" }}>
              <TableCell sx={{ width: 50 }}>Delete</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skus.map((sku, index) => (
              <TableRow key={sku.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(sku.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>{sku.name}</TableCell>
                <TableCell>{sku.price}</TableCell>
                <TableCell>{sku.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        onClick={handleOpenDialog}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 240,
          backgroundColor: "#f3905f",
          ":hover": { backgroundColor: "#f16529" },
        }}
      >
        ADD SKU
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New SKU</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            placeholder="SKU Name"
            value={newSKU.name}
            onChange={(e) => setNewSKU({ ...newSKU, name: e.target.value })}
          />
          <TextField
            placeholder="Price"
            type="number"
            value={newSKU.price}
            onChange={(e) => setNewSKU({ ...newSKU, price: e.target.value })}
          />
          <TextField
            placeholder="Cost"
            type="number"
            value={newSKU.cost}
            onChange={(e) => setNewSKU({ ...newSKU, cost: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSKU}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
