import React, { useState } from 'react';
import {
  addStore,
  updateStore,
  deleteStore,
  reorderStoreUp,
  reorderStoreDown,
} from '../store/slices/storeSlice';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const StoresPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state:any) => state.stores.stores);

  // For creating a new store
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCity, setNewStoreCity] = useState('');
  const [newStoreState, setNewStoreState] = useState('');

  const handleAddStore = () => {
    if (!newStoreName.trim()) return;
    dispatch(
      addStore({
        name: newStoreName.trim(),
        city: newStoreCity.trim(),
        state: newStoreState.trim(),
      })
    );
    setNewStoreName('');
    setNewStoreCity('');
    setNewStoreState('');
  };

  const handleUpdateStore = (id: number, field: string, value: string) => {
    const store = stores.find((s:any) => s.id === id);
    if (store) {
      dispatch(updateStore({ ...store, [field]: value }));
    }
  };

  return (
    <div>
      <h2>Stores</h2>
      <table className="stores-table">
        <thead>
          <tr>
            <th></th>
            <th>S.No</th>
            <th>Store</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store:any, index:any) => (
            <tr key={store.id}>
              <td>
                {/* Delete Button */}
                <button
                  onClick={() => dispatch(deleteStore(store.id))}
                  style={{ marginRight: 8 }}
                >
                  🗑️
                </button>
                {/* Reorder Up/Down */}
                <button
                  onClick={() => dispatch(reorderStoreUp(store.id))}
                  style={{ marginRight: 4 }}
                >
                  ⬆️
                </button>
                <button onClick={() => dispatch(reorderStoreDown(store.id))}>
                  ⬇️
                </button>
              </td>
              <td>{index + 1}</td>
              <td>
                <input
                  value={store.name}
                  onChange={(e) =>
                    handleUpdateStore(store.id, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={store.city}
                  onChange={(e) =>
                    handleUpdateStore(store.id, 'city', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={store.state}
                  onChange={(e) =>
                    handleUpdateStore(store.id, 'state', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 16 }}>
        <h3>New Store</h3>
        <input
          placeholder="Store Name"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
        />
        <input
          placeholder="City"
          value={newStoreCity}
          onChange={(e) => setNewStoreCity(e.target.value)}
        />
        <input
          placeholder="State"
          value={newStoreState}
          onChange={(e) => setNewStoreState(e.target.value)}
        />
        <button onClick={handleAddStore}>Add Store</button>
      </div>
    </div>
  );
};

export default StoresPage;
