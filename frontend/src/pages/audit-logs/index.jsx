import { useState } from "react";
import { Shield, Search, Download, Calendar, Filter, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auditLogs } from "@/data/mock-data";

const actionColors = {
  COMMISSION_CALCULATE: "bg-violet-100 text-violet-800 border-violet-200",
  DATA_IMPORT: "bg-blue-100 text-blue-800 border-blue-200",
  PLAN_UPDATE: "bg-orange-100 text-orange-800 border-orange-200",
  APPROVAL_ACTION: "bg-green-100 text-green-800 border-green-200",
  DISPUTE_CREATE: "bg-red-100 text-red-800 border-red-200",
  AI_VALIDATION: "bg-teal-100 text-teal-800 border-teal-200",
  PLAN_PUBLISH: "bg-emerald-100 text-emerald-800 border-emerald-200",
  SYSTEM_BACKUP: "bg-gray-100 text-gray-800 border-gray-200",
};

const stats = [
  { label: "Total Events", value: "1,247" },
  { label: "Today", value: "34" },
  { label: "This Week", value: "189" },
  { label: "Users Active", value: "12" },
];

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = !searchQuery || log.details?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = !selectedUser || log.user === selectedUser;
    const matchesAction = !selectedAction || log.action === selectedAction;
    return matchesSearch && matchesUser && matchesAction;
  });

  const uniqueUsers = [...new Set(auditLogs.map((log) => log.user))];
  const actionTypes = Object.keys(actionColors);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-violet-600" />
            Audit Logs
          </h1>
          <p className="text-gray-500 mt-1">Complete activity trail and compliance records</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              placeholder="Date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
            >
              <option value="">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
            >
              <option value="">All Actions</option>
              {actionTypes.map((action) => (
                <option key={action} value={action}>{action.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Old Value</TableHead>
              <TableHead>New Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                  {log.timestamp}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(log.user)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={actionColors[log.action] || "bg-gray-100 text-gray-800"}>
                    {log.action.replace(/_/g, " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{log.details}</TableCell>
                <TableCell className="text-sm text-gray-500">{log.oldValue || "—"}</TableCell>
                <TableCell className="text-sm text-gray-500">{log.newValue || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
