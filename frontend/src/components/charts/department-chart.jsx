import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#7C6BFF', '#38BDF8', '#10B981', '#F59E0B', '#94A3B8'];

const defaultData = [
  { name: 'Sales', value: 3.2, percentage: 37.8 },
  { name: 'Field Sales', value: 2.1, percentage: 24.8 },
  { name: 'Customer Success', value: 1.5, percentage: 17.7 },
  { name: 'Operations', value: 1.07, percentage: 12.6 },
  { name: 'Others', value: 0.6, percentage: 7.1 },
];

const DepartmentChart = ({ data = defaultData, total = '₹ 8.47 Cr' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: 300 }}>
      <div style={{ position: 'relative', width: '55%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>Total</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>{total}</p>
        </div>
      </div>
      <div style={{ width: '45%', paddingLeft: '16px' }}>
        {data.map((entry, index) => (
          <div key={entry.name} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: COLORS[index % COLORS.length],
              marginRight: '10px',
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#E0E0E0' }}>{entry.name}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>
                {entry.percentage}% &middot; ₹ {entry.value} Cr
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentChart;
