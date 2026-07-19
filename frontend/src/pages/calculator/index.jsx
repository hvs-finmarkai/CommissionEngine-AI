import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { employees } from "@/data/mock-data";
import { Search, ChevronDown, ChevronUp, Calculator } from "lucide-react";

const plans = ["All Plans", "Standard Tiered", "Accelerator Plus", "Flat 10%", "Enterprise Elite"];
const periods = ["All Periods", "Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];

const calculationData = [
  { id: "EMP-001", name: "Sarah Chen", role: "Account Executive", plan: "Standard Tiered", achievement: 112, baseCommission: 56000, accelerator: 8400, bonus: 5000, deductions: 1200, capApplied: false, netCommission: 68200, status: "Paid" },
  { id: "EMP-002", name: "James Wilson", role: "Senior AE", plan: "Accelerator Plus", achievement: 135, baseCommission: 81000, accelerator: 24300, bonus: 10000, deductions: 2500, capApplied: true, netCommission: 112800, status: "Pending" },
  { id: "EMP-003", name: "Maria Garcia", role: "Enterprise AE", plan: "Enterprise Elite", achievement: 98, baseCommission: 73500, accelerator: 0, bonus: 3000, deductions: 800, capApplied: false, netCommission: 75700, status: "Paid" },
  { id: "EMP-004", name: "David Kim", role: "Account Executive", plan: "Standard Tiered", achievement: 78, baseCommission: 31200, accelerator: 0, bonus: 0, deductions: 500, capApplied: false, netCommission: 30700, status: "Paid" },
  { id: "EMP-005", name: "Emily Brown", role: "Senior AE", plan: "Accelerator Plus", achievement: 145, baseCommission: 87000, accelerator: 34800, bonus: 15000, deductions: 3200, capApplied: true, netCommission: 133600, status: "Review" },
  { id: "EMP-006", name: "Michael Patel", role: "Account Executive", plan: "Flat 10%", achievement: 105, baseCommission: 42000, accelerator: 2100, bonus: 2000, deductions: 600, capApplied: false, netCommission: 45500, status: "Paid" },
  { id: "EMP-007", name: "Lisa Thompson", role: "Enterprise AE", plan: "Enterprise Elite", achievement: 122, baseCommission: 91500, accelerator: 18300, bonus: 8000, deductions: 1800, capApplied: false, netCommission: 116000, status: "Pending" },
  { id: "EMP-008", name: "Robert Chang", role: "Senior AE", plan: "Standard Tiered", achievement: 91, baseCommission: 54600, accelerator: 0, bonus: 2500, deductions: 900, capApplied: false, netCommission: 56200, status: "Paid" },
];

const breakdownData = {
  "EMP-001": [
    { step: 1, description: "Base revenue booked", value: "$700,000" },
    { step: 2, description: "Achievement calculated (700K / 625K quota)", value: "112%" },
    { step: 3, description: "Tier identified: Above Quota (100-120%)", value: "8% rate" },
    { step: 4, description: "Base commission: $700,000 × 8%", value: "$56,000" },
    { step: 5, description: "Accelerator applied: 12% excess × $700K × 12%", value: "+$8,400" },
    { step: 6, description: "Quarterly bonus (team target met)", value: "+$5,000" },
    { step: 7, description: "Clawback deduction (churned account)", value: "-$1,200" },
    { step: 8, description: "Cap check: $68,200 < $250,000 cap", value: "Not applied" },
    { step: 9, description: "Net commission", value: "$68,200" },
  ],
  "EMP-002": [
    { step: 1, description: "Base revenue booked", value: "$1,080,000" },
    { step: 2, description: "Achievement calculated (1.08M / 800K quota)", value: "135%" },
    { step: 3, description: "Tier identified: Accelerator (120%+)", value: "18% rate" },
    { step: 4, description: "Base commission: $1,080,000 × 7.5%", value: "$81,000" },
    { step: 5, description: "Accelerator applied: 35% excess × $1.08M × 18%", value: "+$24,300" },
    { step: 6, description: "President's Club bonus", value: "+$10,000" },
    { step: 7, description: "Clawback deductions", value: "-$2,500" },
    { step: 8, description: "Cap check: $112,800 exceeds plan cap", value: "Applied" },
    { step: 9, description: "Net commission (capped)", value: "$112,800" },
  ],
};

export default function CalculatorPage() {
  const [search, setSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [selectedPeriod, setSelectedPeriod] = useState("All Periods");
  const [expandedRow, setExpandedRow] = useState(null);

  const filteredData = calculationData.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.id.toLowerCase().includes(search.toLowerCase());
    const matchesPlan =
      selectedPlan === "All Plans" || row.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Pending":
        return "secondary";
      case "Review":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Commission Calculator
        </h1>
        <p className="text-muted-foreground mt-1">
          Calculate and review employee commission payouts
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              {plans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Commission Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-right">Achievement %</TableHead>
                  <TableHead className="text-right">Base Commission</TableHead>
                  <TableHead className="text-right">Accelerator</TableHead>
                  <TableHead className="text-right">Bonus</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-center">Cap Applied</TableHead>
                  <TableHead className="text-right">Net Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() =>
                        setExpandedRow(expandedRow === row.id ? null : row.id)
                      }
                    >
                      <TableCell>
                        {expandedRow === row.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {row.id}
                      </TableCell>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.plan}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            row.achievement >= 100 ? "default" : "secondary"
                          }
                        >
                          {row.achievement}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ${row.baseCommission.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${row.accelerator.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${row.bonus.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        -${row.deductions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={row.capApplied ? "destructive" : "outline"}
                        >
                          {row.capApplied ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ${row.netCommission.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(row.status)}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    {expandedRow === row.id && breakdownData[row.id] && (
                      <TableRow key={`${row.id}-detail`}>
                        <TableCell colSpan={13} className="bg-muted/30 p-0">
                          <div className="p-4">
                            <h4 className="font-semibold mb-3">
                              Calculation Breakdown — {row.name}
                            </h4>
                            <div className="space-y-2">
                              {breakdownData[row.id].map((step) => (
                                <div
                                  key={step.step}
                                  className="flex items-center justify-between py-1 px-3 rounded-md bg-background border"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                      {step.step}
                                    </span>
                                    <span className="text-sm">
                                      {step.description}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {step.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={13}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No matching records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
