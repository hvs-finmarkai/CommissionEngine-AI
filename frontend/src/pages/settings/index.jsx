import { useState } from "react";
import { Settings, Building2, Users, Shield, Calendar, Bell, Plug } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roles = [
  { name: "Admin", permissions: { view: true, create: true, edit: true, delete: true, approve: true, export: true } },
  { name: "Finance Manager", permissions: { view: true, create: true, edit: true, delete: false, approve: true, export: true } },
  { name: "Sales Manager", permissions: { view: true, create: false, edit: false, delete: false, approve: false, export: true } },
  { name: "Analyst", permissions: { view: true, create: true, edit: true, delete: false, approve: false, export: true } },
  { name: "Viewer", permissions: { view: true, create: false, edit: false, delete: false, approve: false, export: false } },
];

const businessUnits = ["Enterprise Sales", "SMB Sales", "Channel Partners", "Inside Sales"];
const departments = ["Sales", "Finance", "Operations", "HR", "Technology"];

const tabs = [
  { value: "organization", label: "Organization", icon: Building2 },
  { value: "roles", label: "Roles & Permissions", icon: Shield },
  { value: "approval", label: "Approval Matrix", icon: Users },
  { value: "fiscal", label: "Fiscal Calendar", icon: Calendar },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "integrations", label: "Integrations", icon: Plug },
];

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Denave India Pvt Ltd");
  const [currency, setCurrency] = useState("₹ INR");
  const [fiscalYear, setFiscalYear] = useState("Apr-Mar");
  const [rolesData, setRolesData] = useState(roles);

  const handlePermissionToggle = (roleIndex, permission) => {
    const updated = [...rolesData];
    updated[roleIndex].permissions[permission] = !updated[roleIndex].permissions[permission];
    setRolesData(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-gray-700" />
          Settings
        </h1>
        <p className="text-gray-500 mt-1">Organization and system configuration</p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="organization">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold">Organization Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fiscal Year</label>
                <Input value={fiscalYear} onChange={(e) => setFiscalYear(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Units</label>
              <div className="flex flex-wrap gap-2">
                {businessUnits.map((unit) => (
                  <span key={unit} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                    {unit}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Departments</label>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <span key={dept} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold">Roles & Permissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Role</th>
                    <th className="text-center p-3 font-medium">View</th>
                    <th className="text-center p-3 font-medium">Create</th>
                    <th className="text-center p-3 font-medium">Edit</th>
                    <th className="text-center p-3 font-medium">Delete</th>
                    <th className="text-center p-3 font-medium">Approve</th>
                    <th className="text-center p-3 font-medium">Export</th>
                  </tr>
                </thead>
                <tbody>
                  {rolesData.map((role, roleIndex) => (
                    <tr key={role.name} className="border-b">
                      <td className="p-3 font-medium">{role.name}</td>
                      {Object.keys(role.permissions).map((perm) => (
                        <td key={perm} className="text-center p-3">
                          <input
                            type="checkbox"
                            checked={role.permissions[perm]}
                            onChange={() => handlePermissionToggle(roleIndex, perm)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="approval">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold">Approval Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Commission Threshold (Level 1)</label>
                <Input defaultValue="₹50,000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Approver (Level 1)</label>
                <Input defaultValue="Sales Manager" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Commission Threshold (Level 2)</label>
                <Input defaultValue="₹2,00,000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Approver (Level 2)</label>
                <Input defaultValue="Finance Director" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Commission Threshold (Level 3)</label>
                <Input defaultValue="₹5,00,000+" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Approver (Level 3)</label>
                <Input defaultValue="CFO" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="fiscal">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold">Fiscal Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fiscal Year Start</label>
                <Input defaultValue="April" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fiscal Year End</label>
                <Input defaultValue="March" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Period</label>
                <Input defaultValue="Q1 FY26 (Apr-Jun 2025)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payout Frequency</label>
                <Input defaultValue="Monthly" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Commission Calculated</p>
                  <p className="text-sm text-gray-500">Notify when commission calculations complete</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Approval Required</p>
                  <p className="text-sm text-gray-500">Notify when approval is pending</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Dispute Filed</p>
                  <p className="text-sm text-gray-500">Notify when a dispute is created</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Data Import Complete</p>
                  <p className="text-sm text-gray-500">Notify when data imports finish</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-gray-500">Critical system notifications</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold">Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">CRM System</label>
                <Input defaultValue="Salesforce" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CRM API Key</label>
                <Input type="password" defaultValue="••••••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ERP System</label>
                <Input defaultValue="SAP" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ERP API Key</label>
                <Input type="password" defaultValue="••••••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">HRMS System</label>
                <Input defaultValue="Workday" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">HRMS API Key</label>
                <Input type="password" defaultValue="••••••••••••" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
