import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";

const storeDataMap: Record<
  string,
  Array<{ week: string; gmDollars: number; gmPercent: number }>
> = {
  "San Francisco Bay Trends": [
    { week: "W01", gmDollars: 180000, gmPercent: 50 },
    { week: "W02", gmDollars: 120000, gmPercent: 40 },
    { week: "W03", gmDollars: 150000, gmPercent: 55 },
    { week: "W04", gmDollars: 95000, gmPercent: 35 },
    // ...
  ],
  "Atlanta Outfitters": [
    { week: "W01", gmDollars: 100000, gmPercent: 30 },
    { week: "W02", gmDollars: 140000, gmPercent: 45 },
    { week: "W03", gmDollars: 90000, gmPercent: 40 },
    { week: "W04", gmDollars: 160000, gmPercent: 60 },
    // ...
  ],
  "Chicago Charm Boutique": [
    { week: "W01", gmDollars: 200000, gmPercent: 60 },
    { week: "W02", gmDollars: 130000, gmPercent: 55 },
    { week: "W03", gmDollars: 115000, gmPercent: 52 },
    { week: "W04", gmDollars: 185000, gmPercent: 57 },
    // ...
  ],
};

const DarkChart: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState(
    "San Francisco Bay Trends"
  );

  const chartData = useMemo(() => {
    return storeDataMap[selectedStore] || [];
  }, [selectedStore]);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        backgroundColor: "#333",
        padding: 20,
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: "#fff", marginRight: 8 }}>Store:</label>
        <select
          style={{ padding: 6 }}
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option>San Francisco Bay Trend</option>
          <option>Atlanta Outfitters</option>
          <option>Chicago Charm Boutique</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#444" />
              <stop offset="100%" stopColor="#222" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#chartBg)" />
          <text
            x="50%"
            y="10"
            textAnchor="middle"
            dominantBaseline="hanging"
            fontSize={18}
            fill="#fff"
          >
            Gross Margin
          </text>

          <CartesianGrid strokeDasharray="3 3" stroke="#666" />

          <XAxis
            dataKey="week"
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={{ stroke: "#ccc" }}
          />

          <YAxis
            yAxisId="left"
            domain={[0, 250000]}
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={{ stroke: "#ccc" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 70]}
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={{ stroke: "#ccc" }}
            tickFormatter={(value) => `${value}%`}
          />

          <Tooltip
            contentStyle={{ backgroundColor: "#444", border: "none" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            formatter={(value: number, name: string) =>
              name === "GM %"
                ? `${value.toFixed(1)}%`
                : `$${value.toLocaleString()}`
            }
          />
          <Legend wrapperStyle={{ color: "#fff" }} />

          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#3498db"
            name="GM Dollars"
            barSize={25}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#e67e22"
            strokeWidth={3}
            name="GM %"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DarkChart;
