import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Layers,
  Percent,
  TrendingUp,
  Users,
  Zap,
  UserCheck,
  Target,
  Shuffle,
  Calculator,
  Activity,
  CheckCircle,
  Gauge,
} from "lucide-react";

const stats = [
  { label: "Total Rules", value: 42, icon: Layers, color: "text-blue-600" },
  { label: "Active", value: 38, icon: CheckCircle, color: "text-green-600" },
  { label: "Tiered", value: 12, icon: Activity, color: "text-purple-600" },
  { label: "Accelerators", value: 8, icon: Gauge, color: "text-orange-600" },
];

const ruleTypes = [
  { name: "Tiered Commission", description: "Progressive rates based on achievement levels", count: 12, icon: Layers },
  { name: "Flat Percentage", description: "Fixed percentage applied to revenue or bookings", count: 8, icon: Percent },
  { name: "Accelerator", description: "Multipliers that kick in above quota thresholds", count: 8, icon: TrendingUp },
  { name: "Team Bonus", description: "Shared bonus pool distributed across team members", count: 4, icon: Users },
  { name: "SPIFF", description: "Short-term incentives for specific products or actions", count: 3, icon: Zap },
  { name: "Manager Override", description: "Override commission on direct report achievements", count: 3, icon: UserCheck },
  { name: "Milestone", description: "One-time payouts triggered at specific thresholds", count: 2, icon: Target },
  { name: "Hybrid", description: "Combination of multiple rule types in one plan", count: 2, icon: Shuffle },
];

const sampleRule = {
  ruleId: "TIER-001",
  name: "Standard Sales Tiered Commission",
  type: "tiered",
  status: "active",
  effectiveDate: "2026-01-01",
  tiers: [
    { min: 0, max: 80, rate: 0.05, label: "Below Quota" },
    { min: 80, max: 100, rate: 0.08, label: "At Quota" },
    { min: 100, max: 120, rate: 0.12, label: "Above Quota" },
    { min: 120, max: null, rate: 0.18, label: "Accelerator" },
  ],
  conditions: {
    applicableRoles: ["Account Executive", "Senior AE", "Enterprise AE"],
    minTenureDays: 90,
    requireActiveStatus: true,
    cappedAt: 250000,
  },
};

export default function RuleEnginePage() {
  const [role, setRole] = useState("");
  const [achievement, setAchievement] = useState("");
  const [kpiValue, setKpiValue] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const achievementNum = parseFloat(achievement);
    const kpi = parseFloat(kpiValue);

    if (isNaN(achievementNum) || isNaN(kpi)) {
      setResult(null);
      return;
    }

    let rate = 0.05;
    if (achievementNum >= 120) rate = 0.18;
    else if (achievementNum >= 100) rate = 0.12;
    else if (achievementNum >= 80) rate = 0.08;

    const estimated = kpi * rate;
    setResult({
      rate: (rate * 100).toFixed(1),
      estimated: estimated.toFixed(2),
      tier:
        achievementNum >= 120
          ? "Accelerator"
          : achievementNum >= 100
          ? "Above Quota"
          : achievementNum >= 80
          ? "At Quota"
          : "Below Quota",
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rule Engine</h1>
        <p className="text-muted-foreground mt-1">
          Configure commission calculation rules
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Rule Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ruleTypes.map((rule) => (
            <Card key={rule.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <rule.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary">{rule.count}</Badge>
                </div>
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rule.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Sample Rule Structure</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {sampleRule.name}
            </CardTitle>
            <CardDescription>
              Rule ID: {sampleRule.ruleId} · Type: {sampleRule.type} · Status:{" "}
              <Badge variant="default">{sampleRule.status}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96">
              {JSON.stringify(sampleRule, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Rule Simulation</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input
                  placeholder="e.g. Account Executive"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Achievement %</label>
                <Input
                  type="number"
                  placeholder="e.g. 110"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">KPI Value</label>
                <Input
                  type="number"
                  placeholder="e.g. 500000"
                  value={kpiValue}
                  onChange={(e) => setKpiValue(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleCalculate} className="mb-4">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate
            </Button>
            {result && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tier</p>
                      <p className="text-lg font-semibold">{result.tier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rate Applied</p>
                      <p className="text-lg font-semibold">{result.rate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Commission
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        ${Number(result.estimated).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
