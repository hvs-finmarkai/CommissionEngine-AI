import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, TrendingUp, Target, Award, Calendar, MessageSquare } from "lucide-react";

const earningsData = [
  { month: "Jul 2026", base: "₹1,20,000", accelerator: "₹85,000", bonus: "₹30,000", deductions: "₹-5,322", net: "₹2,29,678", status: "Pending" },
  { month: "Jun 2026", base: "₹1,20,000", accelerator: "₹78,000", bonus: "₹25,000", deductions: "₹-4,200", net: "₹2,18,800", status: "Paid" },
  { month: "May 2026", base: "₹1,20,000", accelerator: "₹72,000", bonus: "₹28,000", deductions: "₹-3,800", net: "₹2,16,200", status: "Paid" },
  { month: "Apr 2026", base: "₹1,20,000", accelerator: "₹65,000", bonus: "₹22,000", deductions: "₹-4,500", net: "₹2,02,500", status: "Paid" },
  { month: "Mar 2026", base: "₹1,20,000", accelerator: "₹70,000", bonus: "₹20,000", deductions: "₹-3,200", net: "₹2,06,800", status: "Paid" },
  { month: "Feb 2026", base: "₹1,20,000", accelerator: "₹60,000", bonus: "₹18,000", deductions: "₹-2,900", net: "₹1,95,100", status: "Paid" },
];

const commissionBreakdown = [
  { label: "Base Commission", percentage: 60, color: "bg-blue-500" },
  { label: "Accelerator", percentage: 25, color: "bg-purple-500" },
  { label: "Team Bonus", percentage: 10, color: "bg-green-500" },
  { label: "SPIFF", percentage: 5, color: "bg-orange-500" },
];

export default function RepPortal() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-semibold">VK</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vikash Kumar</h1>
            <p className="text-gray-600 dark:text-gray-300">Senior Sales Executive</p>
            <Badge variant="secondary" className="mt-1">Sales - North</Badge>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Employee Self-Service</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Current Month</span>
            <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹2,45,678</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">YTD Earnings</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹18,92,340</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Projected Annual</span>
            <Target className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹28,50,000</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Rank</span>
            <Award className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">#1 <span className="text-sm font-normal text-gray-500 dark:text-gray-400 dark:text-gray-500">of 520</span></p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          Target Progress
        </h2>
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Conversions</span>
              <span className="text-sm font-semibold text-green-600">128%</span>
            </div>
            <Progress value={100} className="h-3 [&>div]:bg-green-500" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Quality Score</span>
              <span className="text-sm font-semibold text-blue-600">92%</span>
            </div>
            <Progress value={92} className="h-3 [&>div]:bg-blue-500" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Attendance</span>
              <span className="text-sm font-semibold text-teal-600">96%</span>
            </div>
            <Progress value={96} className="h-3 [&>div]:bg-teal-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          Monthly Earnings History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Month</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Base</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Accelerator</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Bonus</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Deductions</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Net Commission</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {earningsData.map((row) => (
                <tr key={row.month} className="border-b border-gray-100 hover:bg-gray-50 dark:bg-[#0A1628]">
                  <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{row.month}</td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-200">{row.base}</td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-200">{row.accelerator}</td>
                  <td className="py-3 px-2 text-right text-gray-700 dark:text-gray-200">{row.bonus}</td>
                  <td className="py-3 px-2 text-right text-red-600">{row.deductions}</td>
                  <td className="py-3 px-2 text-right font-semibold text-gray-900 dark:text-white">{row.net}</td>
                  <td className="py-3 px-2 text-center">
                    <Badge variant={row.status === "Paid" ? "default" : "secondary"} className={row.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          Commission Breakdown
        </h2>
        <div className="space-y-4">
          {commissionBreakdown.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {commissionBreakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">{item.label} ({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Raise Dispute
        </Button>
      </div>
    </div>
  );
}
