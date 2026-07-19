import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#7C6BFF', '#38BDF8', '#10B981', '#F59E0B', '#94A3B8'];

const defaultData = [
  { tier: 'Tier 1', count: 142, amount: 3.2 },
  { tier: 'Tier 2', count: 98, amount: 2.4 },
  { tier: 'Tier 3', count: 67, amount: 1.5 },
  { tier: 'Tier 4', count: 43, amount: 0.87 },
  { tier: 'Tier 5', count: 25, amount: 0.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload;
  return (
    <div style={{
      background: '#1E1B2E',
      border: '1px solid #2D2A3E',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <p style={{ color: '#E0E0E0', margin: '0 0 6px', fontSize: '13px', fontWeight: 600 }}>
        {label}
      </p>
      <p style={{ color: '#7C6BFF', margin: '0 0 4px', fontSize: '12px' }}>
        Employees: {data.count}
      </p>
      <p style={{ color: '#10B981', margin: 0, fontSize: '12px' }}>
        Commission: ₹ {data.amount} Cr
      </p>
    </div>
  );
};

const CommissionDistributionChart = ({ data = defaultData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2D2A3E" vertical={false} />
        <XAxis
          dataKey="tier"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 12 }}
          tickFormatter={(v) => `₹${v} Cr`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,107,255,0.05)' }} />
        <Bar dataKey="amount" name="Commission" radius={[6, 6, 0, 0]} barSize={48}>
          {data.map((entry, index) => (
            <Cell key={entry.tier} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CommissionDistributionChart;
