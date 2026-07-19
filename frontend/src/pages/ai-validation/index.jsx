import { useState } from "react";
import { Brain, AlertTriangle, CheckCircle2, XCircle, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { validationResults } from "@/data/mock-data";

const severityConfig = {
  high: { color: "bg-red-100 text-red-800 border-red-200", dot: "bg-red-500" },
  medium: { color: "bg-orange-100 text-orange-800 border-orange-200", dot: "bg-orange-500" },
  low: { color: "bg-green-100 text-green-800 border-green-200", dot: "bg-green-500" },
};

export default function AIValidation() {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Validation</h1>
          <p className="text-gray-500 mt-1">
            Automated anomaly detection and commission verification
          </p>
        </div>
        <Button
          onClick={handleScan}
          disabled={scanning}
          className="bg-violet-600 hover:bg-violet-700 text-white"
        >
          <Zap className="w-4 h-4 mr-2" />
          {scanning ? "Scanning..." : "Run Full Scan"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Issues</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-violet-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">High Severity</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Medium Severity</p>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Severity</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-violet-600" />
          <h2 className="text-lg font-semibold">Validation Results</h2>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium">AI Confidence:</span>
            <Badge className="bg-violet-100 text-violet-800 border-violet-200">94.2% Accuracy</Badge>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Issue Description</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>AI Recommendation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validationResults.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">{item.employeeId}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="max-w-[200px]">{item.issueDescription}</TableCell>
                <TableCell>
                  <Badge className={severityConfig[item.severity].color}>
                    <span className={`w-2 h-2 rounded-full ${severityConfig[item.severity].dot} mr-1.5 inline-block`} />
                    {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={item.amount < 0 ? "text-red-600 font-medium" : "font-medium"}>
                    {item.amount < 0 ? "-" : ""}${Math.abs(item.amount).toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-500 bg-muted px-2 py-1 rounded max-w-[200px]">
                    {item.aiRecommendation}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                      Resolve
                    </Button>
                    <Button size="sm" variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                      Ignore
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Escalate
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
