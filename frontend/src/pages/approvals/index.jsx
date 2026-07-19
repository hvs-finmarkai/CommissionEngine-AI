import { CheckCircle2, XCircle, Clock, MessageSquare, ArrowRight, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { approvalWorkflows } from "@/data/mock-data";

const levelStatus = {
  approved: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", label: "Approved" },
  pending: { icon: Clock, color: "text-orange-500", bg: "bg-orange-50", label: "Pending" },
  rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "Rejected" },
};

const approvalLevels = ["Sales Manager", "Finance", "HR", "Payroll"];

export default function Approvals() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Approval Workflow</h1>
        <p className="text-muted-foreground mt-1">
          Multi-level commission approval pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved This Month</p>
              <p className="text-2xl font-bold text-green-600">18</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {approvalWorkflows.map((workflow) => (
          <Card key={workflow.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{workflow.planName}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    ${workflow.amount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {workflow.employeeCount} employees
                  </span>
                  <span>Initiated by {workflow.initiatedBy}</span>
                  <span>{workflow.date}</span>
                </div>
              </div>
              <Badge className="bg-violet-100 text-violet-800 border-violet-200">
                Level {workflow.currentLevel} of {approvalLevels.length}
              </Badge>
            </div>

            <div className="ml-2 mb-4">
              {approvalLevels.map((level, index) => {
                const status = index < workflow.currentLevel
                  ? "approved"
                  : index === workflow.currentLevel
                    ? "pending"
                    : null;
                const config = status ? levelStatus[status] : null;
                const StatusIcon = config ? config.icon : Clock;

                return (
                  <div key={level} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config ? config.bg : "bg-gray-100"}`}>
                        <StatusIcon className={`w-4 h-4 ${config ? config.color : "text-gray-400"}`} />
                      </div>
                      {index < approvalLevels.length - 1 && (
                        <div className={`w-0.5 h-8 ${index < workflow.currentLevel ? "bg-green-300" : "bg-gray-200"}`} />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-medium ${!config ? "text-gray-400" : ""}`}>
                        {level}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {config ? config.label : "Waiting"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {workflow.comment && (
              <div className="flex items-start gap-2 p-3 bg-muted rounded-md mb-4">
                <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">{workflow.comment}</p>
              </div>
            )}

            {workflow.status === "pending" && (
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Request Info
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
