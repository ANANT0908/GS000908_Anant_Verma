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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const initialStores: Store[] = [
  { id: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { id: 2, name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { id: 3, name: "Houston Harvest Market", city: "Houston", state: "TX" },
  { id: 4, name: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
  { id: 5, name: "Miami Breeze Apparel", city: "Miami", state: "FL" },
];

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>(initialStores);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setStores((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === Number(active.id));
      const newIndex = prev.findIndex((item) => item.id === Number(over.id));
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleDelete = (id: number) => {
    setStores((prev) => prev.filter((store) => store.id !== id));
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeState, setStoreState] = useState("");

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setStoreName("");
    setStoreCity("");
    setStoreState("");
  };

  const handleAddStore = () => {
    if (!storeName.trim()) return;
    const newId =
      stores.length > 0 ? Math.max(...stores.map((s) => s.id)) + 1 : 1;
    const newStore: Store = {
      id: newId,
      name: storeName.trim(),
      city: storeCity.trim(),
      state: storeState.trim(),
    };
    setStores([...stores, newStore]);
    handleCloseDialog();
  };

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      <h2 style={{ margin: "16px 0" }}>Store</h2>

      <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stores.map((s) => s.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f7f8" }}>
                  <TableCell sx={{ width: 50 }}>Delete</TableCell>
                  <TableCell sx={{ width: 80 }}>S.No / Drag</TableCell>
                  <TableCell>Store</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stores.map((store, index) => (
                  <SortableRow
                    key={store.id}
                    store={store}
                    index={index}
                    onDelete={handleDelete}
                  />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </TableContainer>

      <Button
        variant="contained"
        onClick={handleOpenDialog}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 240,
          backgroundColor: "#f3905f",
          ":hover": {
            backgroundColor: "#f16529",
          },
        }}
      >
        NEW STORE
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Store</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <TextField
            placeholder="City"
            value={storeCity}
            onChange={(e) => setStoreCity(e.target.value)}
          />
          <TextField
            placeholder="State"
            value={storeState}
            onChange={(e) => setStoreState(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStore}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

interface SortableRowProps {
  store: Store;
  index: number;
  onDelete: (id: number) => void;
}

function SortableRow({ store, index, onDelete }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: store.id.toString() });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: isDragging ? "#fafafa" : "inherit",
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <IconButton size="small" onClick={() => onDelete(store.id)}>
          <Delete />
        </IconButton>
      </TableCell>
      <TableCell>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
        <IconButton
          size="small"
          sx={{ cursor: "grab", ml: 1 }}
          {...attributes}
          {...listeners}
        >
          <DragIndicatorIcon />
        </IconButton>
        <div>{index + 1}</div>
        </div>
      </TableCell>
      <TableCell>{store.name}</TableCell>
      <TableCell>{store.city}</TableCell>
      <TableCell>{store.state}</TableCell>
    </TableRow>
  );
}
