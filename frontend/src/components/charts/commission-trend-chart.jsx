import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const defaultData = [
  { month: 'Apr', currentYear: 45, previousYear: 38 },
  { month: 'May', currentYear: 52, previousYear: 42 },
  { month: 'Jun', currentYear: 48, previousYear: 44 },
  { month: 'Jul', currentYear: 61, previousYear: 47 },
  { month: 'Aug', currentYear: 55, previousYear: 49 },
  { month: 'Sep', currentYear: 67, previousYear: 52 },
  { month: 'Oct', currentYear: 72, previousYear: 55 },
  { month: 'Nov', currentYear: 78, previousYear: 58 },
  { month: 'Dec', currentYear: 82, previousYear: 61 },
  { month: 'Jan', currentYear: 88, previousYear: 64 },
  { month: 'Feb', currentYear: 91, previousYear: 67 },
  { month: 'Mar', currentYear: 95, previousYear: 70 },
];

const formatCurrency = (value) => {
  if (value >= 100) return `₹ ${(value / 100).toFixed(2)} Cr`;
  return `₹ ${value.toFixed(2)} L`;
};

const formatYAxis = (value) => {
  if (value >= 100) return `${(value / 100).toFixed(1)} Cr`;
  return `${value} L`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#1E1B2E',
      border: '1px solid #2D2A3E',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <p style={{ color: '#A0A0B0', margin: '0 0 8px', fontSize: '13px' }}>{label}</p>
      <p style={{ color: '#7C6BFF', margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>
        Current Year: {formatCurrency(payload[0]?.value || 0)}
      </p>
      <p style={{ color: '#94A3B8', margin: 0, fontSize: '14px', fontWeight: 600 }}>
        Previous Year: {formatCurrency(payload[1]?.value || 0)}
      </p>
    </div>
  );
};

const CommissionTrendChart = ({ data = defaultData }) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCurrentYear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7C6BFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7C6BFF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPreviousYear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2D2A3E" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 12 }}
          tickFormatter={formatYAxis}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ color: '#94A3B8', fontSize: '12px', paddingTop: '10px' }}
        />
        <Area
          type="monotone"
          dataKey="currentYear"
          name="Current Year"
          stroke="#7C6BFF"
          strokeWidth={2.5}
          fill="url(#colorCurrentYear)"
          dot={false}
          activeDot={{ r: 5, fill: '#7C6BFF', stroke: '#fff', strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="previousYear"
          name="Previous Year"
          stroke="#94A3B8"
          strokeWidth={2}
          strokeDasharray="5 5"
          fill="url(#colorPreviousYear)"
          dot={false}
          activeDot={{ r: 4, fill: '#94A3B8', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CommissionTrendChart;
