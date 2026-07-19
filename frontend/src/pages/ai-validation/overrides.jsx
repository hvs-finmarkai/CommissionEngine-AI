import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, ArrowUpDown, CheckCircle2, XCircle } from "lucide-react";

const overrides = [
  { id: "OVR-001", employee: "DN-5034 Rahul K", manager: "Vikash Kumar", original: "₹28,000", override: "₹35,000", difference: "+₹7,000", reason: "Exceptional Q3 performance", status: "approved", date: "25 Oct 2024" },
  { id: "OVR-002", employee: "DN-5078 Neha S", manager: "Priya Sharma", original: "₹42,000", override: "₹48,500", difference: "+₹6,500", reason: "Client retention bonus", status: "approved", date: "26 Oct 2024" },
  { id: "OVR-003", employee: "DN-5112 Amit P", manager: "Rohit Verma", original: "₹15,000", override: "₹22,000", difference: "+₹7,000", reason: "New product launch contribution", status: "pending", date: "28 Oct 2024" },
  { id: "OVR-004", employee: "DN-5156 Raj N", manager: "Anita Desai", original: "₹55,000", override: "₹45,000", difference: "-₹10,000", reason: "Quality score penalty applied", status: "approved", date: "27 Oct 2024" },
  { id: "OVR-005", employee: "DN-5089 Priya G", manager: "Vikash Kumar", original: "₹32,000", override: "₹38,000", difference: "+₹6,000", reason: "Team lead responsibilities", status: "pending", date: "28 Oct 2024" },
  { id: "OVR-006", employee: "DN-5201 Sneha V", manager: "Priya Sharma", original: "₹28,000", override: "₹28,000", difference: "₹0", reason: "No change - override rejected", status: "rejected", date: "26 Oct 2024" },
];

const statusStyles = {
  pending: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function OverridesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manager Overrides</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage commission overrides applied by managers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Overrides</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <ArrowUpDown className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">6</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F1D32]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">2</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-[#0F1D32]">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Override History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-500 dark:text-gray-400">Override ID</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Employee</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Manager</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Original Amount</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Override Amount</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Difference</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Reason</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Status</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overrides.map((item) => (
                <TableRow key={item.id} className="border-gray-100 dark:border-gray-800">
                  <TableCell className="font-mono text-gray-900 dark:text-white">{item.id}</TableCell>
                  <TableCell className="text-gray-900 dark:text-white">{item.employee}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{item.manager}</TableCell>
                  <TableCell className="text-gray-900 dark:text-white">{item.original}</TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">{item.override}</TableCell>
                  <TableCell className={item.difference.startsWith("+") ? "text-green-600 dark:text-green-400 font-medium" : item.difference.startsWith("-") ? "text-red-600 dark:text-red-400 font-medium" : "text-gray-500 dark:text-gray-400"}>{item.difference}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300 max-w-[200px] truncate">{item.reason}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 dark:text-gray-400">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
