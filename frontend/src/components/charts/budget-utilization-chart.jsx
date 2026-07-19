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
  { department: 'Sales', budget: 3.5, actual: 3.2, utilization: 91 },
  { department: 'Field Sales', budget: 2.5, actual: 2.1, utilization: 84 },
  { department: 'Customer Success', budget: 1.8, actual: 1.5, utilization: 83 },
  { department: 'Operations', budget: 1.2, actual: 1.07, utilization: 89 },
  { department: 'Others', budget: 0.8, actual: 0.6, utilization: 75 },
];

const CustomTooltip = ({ active, payload }) => {
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
        {data.department}
      </p>
      <p style={{ color: '#94A3B8', margin: '0 0 4px', fontSize: '12px' }}>
        Budget: ₹ {data.budget} Cr
      </p>
      <p style={{ color: '#7C6BFF', margin: '0 0 4px', fontSize: '12px' }}>
        Actual: ₹ {data.actual} Cr
      </p>
      <p style={{ color: '#10B981', margin: 0, fontSize: '12px' }}>
        Utilization: {data.utilization}%
      </p>
    </div>
  );
};

const BudgetUtilizationChart = ({ data = defaultData }) => {
  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 20, bottom: 10 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2D2A3E" horizontal={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            tickFormatter={(v) => `₹${v} Cr`}
          />
          <YAxis
            type="category"
            dataKey="department"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,107,255,0.05)' }} />
          <Bar dataKey="budget" name="Budget" fill="#2D2A3E" radius={[0, 4, 4, 0]} barSize={18} />
          <Bar dataKey="actual" name="Actual Spend" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((entry, index) => (
              <Cell key={entry.department} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#2D2A3E' }} />
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>Budget</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#7C6BFF' }} />
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>Actual Spend</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetUtilizationChart;
