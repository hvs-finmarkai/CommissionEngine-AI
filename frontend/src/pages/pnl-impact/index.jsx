import { TrendingUp, TrendingDown, DollarSign, Target, PieChart, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pnlSummary } from "@/data/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const departmentPnL = [
  { department: "Enterprise Sales", revenue: "₹14.20 Cr", commission: "₹3.12 Cr", commissionPct: "22.0%", budget: "₹3.50 Cr", variance: "-₹0.38 Cr", status: "Under Budget" },
  { department: "SMB Sales", revenue: "₹9.85 Cr", commission: "₹2.46 Cr", commissionPct: "25.0%", budget: "₹2.80 Cr", variance: "-₹0.34 Cr", status: "Under Budget" },
  { department: "Channel Partners", revenue: "₹5.60 Cr", commission: "₹1.34 Cr", commissionPct: "23.9%", budget: "₹1.50 Cr", variance: "-₹0.16 Cr", status: "Under Budget" },
  { department: "Inside Sales", revenue: "₹4.23 Cr", commission: "₹1.05 Cr", commissionPct: "24.8%", budget: "₹1.80 Cr", variance: "-₹0.75 Cr", status: "Under Budget" },
  { department: "Customer Success", revenue: "₹1.90 Cr", commission: "₹0.50 Cr", commissionPct: "26.3%", budget: "₹1.20 Cr", variance: "-₹0.70 Cr", status: "Under Budget" },
];

const forecastData = [
  { month: "Jul", projected: 8.9, actual: null },
  { month: "Aug", projected: 9.2, actual: null },
  { month: "Sep", projected: 9.8, actual: null },
];

export default function PnlImpactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">P&L Impact</h1>
        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500">Commission accrual and budget analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Revenue MTD</p>
            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-2xl font-bold">₹35.78 Cr</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>+8.2% vs last month</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Commission Accrual</p>
            <Target className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-2xl font-bold">₹8.47 Cr</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>+5.9% vs last month</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Commission %</p>
            <PieChart className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-2xl font-bold">23.7%</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-amber-600">
            <TrendingDown className="h-3 w-3" />
            <span>-0.5% vs last month</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Budget MTD</p>
            <Target className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-2xl font-bold">₹10.80 Cr</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Allocated this month</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Budget Variance</p>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">-₹2.33 Cr</p>
          <p className="text-sm text-green-600 mt-1">Under budget</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Budget Utilization</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">₹8.47 Cr of ₹10.80 Cr utilized</p>
          </div>
          <Badge variant="secondary">78.4%</Badge>
        </div>
        <Progress value={78.4} className="h-3" />
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Department-wise P&L</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Commission %</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Variance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentPnL.map((dept) => (
              <TableRow key={dept.department}>
                <TableCell className="font-medium">{dept.department}</TableCell>
                <TableCell>{dept.revenue}</TableCell>
                <TableCell>{dept.commission}</TableCell>
                <TableCell>{dept.commissionPct}</TableCell>
                <TableCell>{dept.budget}</TableCell>
                <TableCell className="text-green-600">{dept.variance}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {dept.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Commission Forecast</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Next 3 months projected commission</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-600">
            <TrendingUp className="h-4 w-4" />
            <span>Upward trend</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="projected" stroke="#6366f1" fill="#e0e7ff" strokeWidth={2} name="Projected (₹ Cr)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">July 2026</p>
            <p className="text-lg font-bold">₹8.90 Cr</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">August 2026</p>
            <p className="text-lg font-bold">₹9.20 Cr</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">September 2026</p>
            <p className="text-lg font-bold">₹9.80 Cr</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
