import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CommissionTrendChart from '@/components/charts/commission-trend-chart';
import DepartmentChart from '@/components/charts/department-chart';
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Clock,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  workflowSteps,
  topEarners,
  recentApprovals,
} from '@/data/mock-data';

const kpiData = [
  { title: 'Total Commission Accrued', value: '₹ 8,47,32,150', subtitle: '↑ 18.6% vs Sep 2024', trend: 'up' },
  { title: 'Employees Processed', value: '3,742 / 4,012', subtitle: '93.3% Completed', trend: 'neutral' },
  { title: 'Average Commission', value: '₹ 22,644', subtitle: '↑ 12.4% vs Sep 2024', trend: 'up' },
  { title: 'Budget Utilization', value: '78.4%', subtitle: '₹ 8.47 Cr / ₹ 10.80 Cr', trend: 'neutral' },
  { title: 'Pending Approvals', value: '23', subtitle: '3 Urgent', trend: 'urgent' },
  { title: 'P&L Impact (MTD)', value: '₹ 35,78,45,000', subtitle: '23.7% of Revenue', trend: 'neutral' },
];

const aiAlerts = [
  { label: 'High Commission Anomalies', count: 3, color: 'bg-red-500', severity: 'critical' },
  { label: 'Cap Breaches', count: 2, color: 'bg-amber-500', severity: 'warning' },
  { label: 'Data Quality Issues', count: 3, color: 'bg-amber-500', severity: 'warning' },
  { label: 'Rule Conflicts', count: 0, color: 'bg-emerald-500', severity: 'low' },
];

const pnlImpactSummary = [
  { label: 'Revenue (MTD)', value: '₹ 35,78,45,000' },
  { label: 'Commission Accrual', value: '₹ 8,47,32,150' },
  { label: 'Commission % of Revenue', value: '23.7%' },
  { label: 'Budget (MTD)', value: '₹ 10,80,00,000' },
  { label: 'Budget Variance', value: '-₹ 2,32,67,850', change: '78.4%' },
];

const kpiIcons = [
  { icon: DollarSign, bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { icon: Users, bg: 'bg-blue-100', text: 'text-blue-600' },
  { icon: TrendingUp, bg: 'bg-purple-100', text: 'text-purple-600' },
  { icon: Target, bg: 'bg-amber-100', text: 'text-amber-600' },
  { icon: Clock, bg: 'bg-red-100', text: 'text-red-600' },
  { icon: BarChart3, bg: 'bg-indigo-100', text: 'text-indigo-600' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Welcome back, Anita! 👋</p>
          <h1 className="text-2xl font-bold tracking-tight">Commission Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">
            Track, validate, and manage commission payouts across your organization.
          </p>
        </div>
        <Button className="bg-[#7C6BFF] hover:bg-[#6B5AEE] text-white">
          Quick Actions
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpiIcons[index].icon;
          return (
            <Card key={index} className="p-4 relative">
              <div className="absolute top-3 right-3">
                <div className={`w-8 h-8 rounded-full ${kpiIcons[index].bg} flex items-center justify-center`}>
                  <IconComponent className={`w-4 h-4 ${kpiIcons[index].text}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-medium">{kpi.title}</p>
                <p className="text-xl font-bold">{kpi.value}</p>
                <div className="flex items-center gap-1">
                  {kpi.trend === 'up' && (
                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                  )}
                  <span className={`text-xs ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'urgent' ? 'text-red-500' : 'text-gray-500'}`}>
                    {kpi.subtitle}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-sm font-semibold mb-6">Commission Workflow</h3>
          <div className="flex items-center justify-between relative">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : step.status === 'active'
                      ? 'bg-[#7C6BFF] border-[#7C6BFF] text-white animate-pulse'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  step.status === 'completed'
                    ? 'text-emerald-600 font-medium'
                    : step.status === 'active'
                    ? 'text-[#7C6BFF] font-medium'
                    : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
              <div className="h-full bg-emerald-500" style={{ width: '50%' }} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">AI Validation Alerts</h3>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="space-y-3">
            {aiAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${alert.color}`} />
                  <span className="text-sm">{alert.label}</span>
                </div>
                <Badge variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'warning' ? 'warning' : 'secondary'} className="text-xs">
                  {alert.count}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-semibold mb-4">Commission Trend</h3>
          <CommissionTrendChart />
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold mb-4">Commission by Department</h3>
          <DepartmentChart />
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold mb-4">Top Earners</h3>
          <div className="space-y-3">
            {topEarners.map((earner, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {earner.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{earner.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500">Sales</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(earner.amount)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-6">
          <h3 className="text-sm font-semibold mb-4">Recent Approvals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Plan / Payout Type</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Period</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Amount</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Requested By</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Level</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentApprovals.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 font-medium">{item.plan}</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400 dark:text-gray-500">{item.period}</td>
                    <td className="py-3 font-medium">{formatCurrency(item.amount)}</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400 dark:text-gray-500">{item.requestedBy}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="text-xs">{item.level}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        className={`text-xs ${
                          item.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                            : item.status === 'pending'
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-gray-500 dark:text-gray-400 dark:text-gray-500">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold mb-4">P&L Impact Summary</h3>
          <div className="space-y-4">
            {pnlImpactSummary.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
                {item.change && (
                  <Badge variant="secondary" className="text-xs">
                    {item.change}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
