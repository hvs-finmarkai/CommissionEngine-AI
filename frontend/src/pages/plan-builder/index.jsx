import { useState } from "react";
import { Plus, Search, Filter, Edit, Copy, Archive, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { plans } from "@/data/mock-data";

const stats = [
  { label: "Active Plans", value: "7", icon: FileText, color: "text-[#7C6BFF]", bg: "bg-[#7C6BFF]/5" },
  { label: "Total Employees", value: "4,012", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Draft Plans", value: "1", icon: FileText, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Archived", value: "0", icon: Archive, color: "text-gray-600", bg: "bg-gray-50" },
];

const statusStyles = {
  active: "bg-green-100 text-green-800",
  draft: "bg-orange-100 text-orange-800",
  archived: "bg-gray-100 text-gray-800",
};

export default function PlanBuilder() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const roles = [...new Set(plans.map((p) => p.role))];
  const types = [...new Set(plans.map((p) => p.type))];
  const statuses = [...new Set(plans.map((p) => p.status))];

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(search.toLowerCase()) ||
      plan.id.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || plan.role === roleFilter;
    const matchesType = typeFilter === "all" || plan.type === typeFilter;
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter;
    return matchesSearch && matchesRole && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan Builder</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage commission plans
          </p>
        </div>
        <Button className="bg-[#7C6BFF] hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <CardContent className="p-0 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search plans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan ID</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow
                  key={plan.id}
                  className="hover:bg-[#7C6BFF]/5/50 transition-colors cursor-pointer"
                >
                  <TableCell className="font-mono text-xs text-gray-600">
                    {plan.id}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {plan.name}
                  </TableCell>
                  <TableCell>
                    <Badge>{plan.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{plan.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[plan.status]}`}
                    >
                      {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {plan.employees.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-600">v{plan.version}</TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(plan.effectiveDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Archive className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPlans.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No plans found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
