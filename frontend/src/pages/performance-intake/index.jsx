import { useState } from "react";
import { performanceData } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Database,
} from "lucide-react";

const stats = [
  { label: "Total Records", value: "43,416", icon: Database },
  { label: "Data Sources", value: "5", icon: FileSpreadsheet },
  { label: "Validation Score", value: "97.3%", icon: CheckCircle2 },
  { label: "Last Sync", value: "28 Oct 2024", icon: RefreshCw },
];

const dataSources = [
  { source: "Salesforce CRM", records: "18,432", status: "completed", lastSync: "28 Oct 2024", quality: 99 },
  { source: "HubSpot", records: "12,108", status: "completed", lastSync: "28 Oct 2024", quality: 97 },
  { source: "SAP ERP", records: "8,241", status: "completed", lastSync: "27 Oct 2024", quality: 98 },
  { source: "Manual Upload", records: "3,112", status: "warning", lastSync: "25 Oct 2024", quality: 89 },
  { source: "Google Sheets", records: "1,523", status: "completed", lastSync: "28 Oct 2024", quality: 95 },
];

const validationItems = [
  { label: "Missing Data", count: 234, color: "bg-red-500" },
  { label: "Duplicate Records", count: 89, color: "bg-orange-500" },
  { label: "Negative Values", count: 12, color: "bg-yellow-500" },
  { label: "Format Errors", count: 47, color: "bg-purple-500" },
];

export default function PerformanceIntake() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.name.endsWith(".csv")
    );
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.name.endsWith(".csv")
    );
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Intake</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Import and validate performance data from multiple sources
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
          <CardDescription>Connected data sources and their sync status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Data Quality</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((ds) => (
                <TableRow key={ds.source}>
                  <TableCell className="font-medium">{ds.source}</TableCell>
                  <TableCell>{ds.records}</TableCell>
                  <TableCell>
                    {ds.status === "completed" ? (
                      <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="default" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Warning
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{ds.lastSync}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={ds.quality} className="h-2 w-24" />
                      <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{ds.quality}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Sync Now
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Data</CardTitle>
          <CardDescription>Import performance data from CSV files</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("csv-upload").click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <FileSpreadsheet className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-lg font-medium">Drop CSV files here or click to upload</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Supported formats: .csv, .xlsx, .xls
            </p>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-md border p-3">
                  <FileSpreadsheet className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Summary</CardTitle>
          <CardDescription>Data quality issues detected across all sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {validationItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <div className={`h-3 w-3 rounded-full ${item.color}`} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{item.label}</p>
                  <p className="text-xl font-bold">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
