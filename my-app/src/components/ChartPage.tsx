import React from 'react';
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
} from 'recharts';


const chartData = [
  { week: 'W01', gmDollars: 180000, gmPercent: 50 },
  { week: 'W02', gmDollars: 120000, gmPercent: 40 },
  { week: 'W03', gmDollars: 150000, gmPercent: 55 },
  { week: 'W04', gmDollars: 95000, gmPercent: 35 },
  { week: 'W05', gmDollars: 210000, gmPercent: 60 },
  { week: 'W06', gmDollars: 130000, gmPercent: 42 },
  { week: 'W07', gmDollars: 175000, gmPercent: 48 },
  { week: 'W08', gmDollars: 220000, gmPercent: 58 },
];

const ChartPage= () => {
  return (
    <div style={{ width: '100%', height: 500, padding: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <select style={{ padding: 6 }}>
          <option>San Francisco Bay Trends</option>
          <option>Atlanta Outfitters</option>
          <option>Chicago Charm Boutique</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
            tick={{ fill: '#ccc' }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
          />

          <YAxis
            yAxisId="left"
            domain={[0, 250000]}
            stroke="#ccc"
            tick={{ fill: '#ccc' }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 70]}
            stroke="#ccc"
            tick={{ fill: '#ccc' }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
            tickFormatter={(value) => `${value}%`}
          />

          <Tooltip
            contentStyle={{ backgroundColor: '#444', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number, name: string) =>
              name === 'GM %' ? `${value.toFixed(1)}%` : `$${value.toLocaleString()}`
            }
          />

          <Legend wrapperStyle={{ color: '#fff' }} />

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

export default ChartPage;
