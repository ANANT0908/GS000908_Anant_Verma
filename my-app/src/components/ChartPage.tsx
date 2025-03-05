import React, { useState, useMemo } from 'react';
import { Store } from '../data/sampleData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useAppSelector } from '../utils/hooks';

const WEEKS = ['W01', 'W02']; // or more

const ChartPage: React.FC = () => {
  const stores = useAppSelector((state:any) => state.stores.stores);
  const skus = useAppSelector((state:any) => state.skus.skus);
  const planningData = useAppSelector((state:any) => state.planning.salesUnits);

  const [selectedStoreId, setSelectedStoreId] = useState<number>(
    stores.length > 0 ? stores[0].id : 0
  );

  const chartData = useMemo(() => {
    if (!selectedStoreId) return [];
    return WEEKS.map((week) => {
      let totalSales = 0;
      let totalCost = 0;
      skus.forEach((sku:any) => {
        const key = `${selectedStoreId}_${sku.id}_${week}`;
        const units = planningData[key] || 0;
        totalSales += units * sku.price;
        totalCost += units * sku.cost;
      });
      const gmDollars = totalSales - totalCost;
      const gmPercent = totalSales === 0 ? 0 : (gmDollars / totalSales) * 100;
      return {
        week,
        gmDollars,
        gmPercent,
        salesDollars: totalSales,
      };
    });
  }, [selectedStoreId, skus, planningData]);

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <h2>Gross Margin Chart</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Select Store: </label>
        <select
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(Number(e.target.value))}
        >
          {stores.map((store:any) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" domain={[0, 'auto']} tickFormatter={(v:any) => `$${v}`} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tickFormatter={(v:any) => `${v}%`} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#ff7300"
            name="GM %"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPage;
