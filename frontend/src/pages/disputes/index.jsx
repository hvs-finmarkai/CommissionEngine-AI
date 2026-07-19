import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MessageSquare, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, User } from "lucide-react";
import { disputes } from "@/data/mock-data";

const statusConfig = {
  open: { label: "Open", className: "bg-blue-100 text-blue-700" },
  under_review: { label: "Under Review", className: "bg-orange-100 text-orange-700" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-700" },
  escalated: { label: "Escalated", className: "bg-red-100 text-red-700" },
};

const statsData = [
  { label: "Open", count: 2, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Under Review", count: 1, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Resolved", count: 1, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Escalated", count: 1, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

export default function DisputeManagement() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispute Management</h1>
          <p className="text-gray-600 mt-1">Track and resolve commission disputes</p>
        </div>
        <Button className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Raise New Dispute
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dispute ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.map((dispute) => (
              <React.Fragment key={dispute.id}>
                <TableRow className="cursor-pointer hover:bg-gray-50 dark:bg-[#0A1628] dark:bg-[#0A1628]" onClick={() => toggleExpand(dispute.id)}>
                  <TableCell className="font-medium">{dispute.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      {dispute.employee}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{dispute.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{dispute.description}</TableCell>
                  <TableCell className="text-right font-medium">{dispute.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[dispute.status]?.className}>
                      {statusConfig[dispute.status]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">{dispute.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedId === dispute.id && dispute.timeline && (
                  <TableRow>
                    <TableCell colSpan={8} className="bg-gray-50 dark:bg-[#0A1628] p-4">
                      <div className="pl-4 border-l-2 border-gray-300 space-y-3">
                        {dispute.timeline.map((event, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{event.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500">{event.date} &middot; {event.by}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
