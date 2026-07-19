import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, CheckCircle2, Shield } from "lucide-react";

const anomalies = [
  { id: "DN-5023", name: "Rahul Sharma", issue: "Commission exceeds 3x average", severity: "high", amount: "₹89,500", recommendation: "Flag for manual review and cap enforcement" },
  { id: "DN-5089", name: "Priya Gupta", issue: "Cap breach Plan PLAN-TS-TIER", severity: "high", amount: "₹52,000", recommendation: "Apply plan cap limit automatically" },
  { id: "DN-5142", name: "Amit Kumar", issue: "Duplicate commission entry", severity: "medium", amount: "₹34,200", recommendation: "Remove duplicate and recalculate" },
  { id: "DN-5201", name: "Sneha Verma", issue: "Missing attendance data", severity: "medium", amount: "₹0", recommendation: "Hold payout until attendance verified" },
  { id: "DN-5067", name: "Vikram Singh", issue: "Negative clawback exceeds earnings", severity: "high", amount: "₹-15,000", recommendation: "Cap clawback at total earnings" },
  { id: "DN-5298", name: "Anita Reddy", issue: "Rule conflict overlapping tiers", severity: "low", amount: "₹28,900", recommendation: "Apply highest applicable tier rule" },
  { id: "DN-5156", name: "Raj Nair", issue: "Budget threshold exceeded", severity: "high", amount: "₹1,250,000", recommendation: "Escalate to finance for budget approval" },
  { id: "DN-5312", name: "Meera Pillai", issue: "Quality score below threshold", severity: "medium", amount: "₹18,500", recommendation: "Apply quality penalty multiplier" },
];

const severityStyles = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

export default function AnomaliesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Anomaly Detection</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time anomaly detection powered by Llama 3.1</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Scanned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3,742</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Anomalies Found</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">High Severity</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI Confidence</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">94.2%</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-[#0F1D32]">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Detected Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Employee ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Issue Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Severity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">AI Recommendation</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-gray-900 dark:text-white">{item.id}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{item.name}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.issue}</td>
                    <td className="py-3 px-4">
                      <Badge className={severityStyles[item.severity]}>{item.severity}</Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{item.amount}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.recommendation}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm" variant="ghost">Dismiss</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-[#0F1D32]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Brain className="h-5 w-5 text-purple-500" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">3 high-severity anomalies detected in commission payouts exceeding budget thresholds — recommend immediate escalation to finance team for approval before processing.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Duplicate entry pattern identified for DN-5142 — similar duplicates may exist in batch uploads from 15-18 Oct. Recommend running deduplication scan on recent imports.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Overall anomaly rate of 0.21% is within acceptable range. Model confidence at 94.2% suggests high reliability — consider auto-resolving low-severity items to reduce manual workload.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
