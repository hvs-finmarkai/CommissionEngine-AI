import { BarChart3, TrendingUp, Target, Lightbulb, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyticsData } from "@/data/mock-data";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Cell,
} from "recharts";

const revenueTrend = [
  { month: "Jan", revenue: 28.5, commission: 6.2 },
  { month: "Feb", revenue: 31.2, commission: 7.1 },
  { month: "Mar", revenue: 29.8, commission: 6.8 },
  { month: "Apr", revenue: 33.4, commission: 7.5 },
  { month: "May", revenue: 35.1, commission: 8.0 },
  { month: "Jun", revenue: 35.78, commission: 8.47 },
];

const departmentROI = [
  { department: "Enterprise Sales", roi: 4.1 },
  { department: "SMB Sales", roi: 3.8 },
  { department: "Channel Partners", roi: 3.5 },
  { department: "Inside Sales", roi: 3.2 },
  { department: "Customer Success", roi: 2.9 },
];

const tierDistribution = [
  { tier: "Tier 1 (0-80%)", commission: 12.4 },
  { tier: "Tier 2 (80-100%)", commission: 18.7 },
  { tier: "Tier 3 (100-120%)", commission: 24.2 },
  { tier: "Accelerator (120%+)", commission: 31.5 },
];

const topPlans = [
  { name: "Enterprise Accelerator", employees: 45, totalCommission: "₹2.14 Cr", avgCommission: "₹4.76 L", roi: "4.5x" },
  { name: "SMB Growth Plan", employees: 120, totalCommission: "₹3.28 Cr", avgCommission: "₹2.73 L", roi: "3.8x" },
  { name: "Channel Partner Bonus", employees: 32, totalCommission: "₹1.05 Cr", avgCommission: "₹3.28 L", roi: "3.5x" },
  { name: "Inside Sales Standard", employees: 85, totalCommission: "₹1.87 Cr", avgCommission: "₹2.20 L", roi: "3.2x" },
  { name: "CS Retention Bonus", employees: 28, totalCommission: "₹0.62 Cr", avgCommission: "₹2.21 L", roi: "2.9x" },
];

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#e0e7ff"];

const insights = [
  "Accelerator plans show 2.3x higher retention compared to standard commission structures.",
  "Enterprise Sales department delivers highest ROI at 4.1x — consider increasing budget allocation by 15%.",
  "Commission payout cycle reduced from 5.2 days to 3.5 days after automation — correlates with 12% improvement in rep satisfaction.",
  "Tier 3 and Accelerator tiers account for 65% of total commission but drive 82% of incremental revenue.",
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Commission effectiveness and ROI analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Commission ROI</p>
              <p className="text-2xl font-bold">3.2x</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>+0.4x vs last quarter</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue per ₹1 Commission</p>
              <p className="text-2xl font-bold">₹4.22</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>+₹0.38 vs last quarter</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Payout Time</p>
              <p className="text-2xl font-bold">3.5 days</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Target className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>-1.7 days vs last quarter</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dispute Resolution</p>
              <p className="text-2xl font-bold">94%</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>+6% vs last quarter</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue vs Commission Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#6366f1" name="Revenue (₹ Cr)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="commission" stroke="#f59e0b" strokeWidth={2} name="Commission (₹ Cr)" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department ROI Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentROI} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="department" type="category" width={130} />
              <Tooltip />
              <Bar dataKey="roi" name="ROI (x)">
                {departmentROI.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Commission Distribution by Tier</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tierDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tier" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="commission" name="Commission (₹ L)" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                {tierDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Plans</h3>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Plan Name</th>
                  <th className="text-right py-2 font-medium">Employees</th>
                  <th className="text-right py-2 font-medium">Total Commission</th>
                  <th className="text-right py-2 font-medium">Avg Commission</th>
                  <th className="text-right py-2 font-medium">ROI</th>
                </tr>
              </thead>
              <tbody>
                {topPlans.map((plan) => (
                  <tr key={plan.name} className="border-b last:border-0">
                    <td className="py-2 font-medium">{plan.name}</td>
                    <td className="text-right py-2">{plan.employees}</td>
                    <td className="text-right py-2">{plan.totalCommission}</td>
                    <td className="text-right py-2">{plan.avgCommission}</td>
                    <td className="text-right py-2">
                      <Badge variant="secondary">{plan.roi}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Lightbulb className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold">AI Insights & Recommendations</h3>
        </div>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
              <p className="text-sm text-muted-foreground">{insight}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
