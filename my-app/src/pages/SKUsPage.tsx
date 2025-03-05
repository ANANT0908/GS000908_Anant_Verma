import React, { useState } from 'react';
import { addSKU, updateSKU, deleteSKU } from '../store/slices/skuSlice';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const SKUsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state:any) => state.skus.skus);

  const [newSKUName, setNewSKUName] = useState('');
  const [newSKUPrice, setNewSKUPrice] = useState('0');
  const [newSKUCost, setNewSKUCost] = useState('0');

  const handleAddSKU = () => {
    if (!newSKUName.trim()) return;
    dispatch(
      addSKU({
        name: newSKUName.trim(),
        price: parseFloat(newSKUPrice) || 0,
        cost: parseFloat(newSKUCost) || 0,
      })
    );
    setNewSKUName('');
    setNewSKUPrice('0');
    setNewSKUCost('0');
  };

  const handleUpdateSKU = (id: number, field: string, value: string) => {
    const sku = skus.find((s:any) => s.id === id);
    if (sku) {
      dispatch({
        type: updateSKU.type,
        payload: { ...sku, [field]: parseFloat(value) || value },
      });
    }
  };

  return (
    <div>
      <h2>SKUs</h2>
      <table className="sku-table">
        <thead>
          <tr>
            <th></th>
            <th>SKU</th>
            <th>Price</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((sku:any) => (
            <tr key={sku.id}>
              <td>
                <button onClick={() => dispatch(deleteSKU(sku.id))}>🗑️</button>
              </td>
              <td>{sku.name}</td>
              <td>
                <input
                  type="number"
                  value={sku.price}
                  onChange={(e) =>
                    handleUpdateSKU(sku.id, 'price', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={sku.cost}
                  onChange={(e) =>
                    handleUpdateSKU(sku.id, 'cost', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 16 }}>
        <h3>New SKU</h3>
        <input
          placeholder="SKU Name"
          value={newSKUName}
          onChange={(e) => setNewSKUName(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          value={newSKUPrice}
          onChange={(e) => setNewSKUPrice(e.target.value)}
        />
        <input
          placeholder="Cost"
          type="number"
          value={newSKUCost}
          onChange={(e) => setNewSKUCost(e.target.value)}
        />
        <button onClick={handleAddSKU}>Add SKU</button>
      </div>
    </div>
  );
};

export default SKUsPage;
