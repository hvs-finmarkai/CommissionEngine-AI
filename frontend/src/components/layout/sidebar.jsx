import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Upload,
  Cpu,
  Calculator,
  Brain,
  CheckCircle,
  TrendingUp,
  User,
  MessageSquare,
  BarChart3,
  FileBarChart,
  Shield,
  Settings,
} from "lucide-react";

const navGroups = [
  {
    items: [{ label: "Overview", icon: Home, path: "/" }],
  },
  {
    title: "COMMISSION SETUP",
    items: [
      { label: "Plan Builder", icon: FileText, path: "/plan-builder" },
      { label: "Performance Intake", icon: Upload, path: "/performance-intake" },
      { label: "Rule Engine", icon: Cpu, path: "/rule-engine" },
      { label: "Commission Calculator", icon: Calculator, path: "/calculator" },
    ],
  },
  {
    title: "MANAGE & VALIDATE",
    items: [
      { label: "AI Validation", icon: Brain, path: "/ai-validation", badge: 8 },
      { label: "Approvals", icon: CheckCircle, path: "/approvals", badge: 3 },
      { label: "P&L Impact", icon: TrendingUp, path: "/pnl-impact" },
    ],
  },
  {
    title: "EMPLOYEE & SUPPORT",
    items: [
      { label: "Rep Portal", icon: User, path: "/rep-portal" },
      { label: "Disputes", icon: MessageSquare, path: "/disputes" },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { label: "Analytics", icon: BarChart3, path: "/analytics" },
      { label: "Reports", icon: FileBarChart, path: "/reports" },
    ],
  },
  {
    title: "ADMIN",
    items: [
      { label: "Audit Logs", icon: Shield, path: "/audit-logs" },
      { label: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg">Finmark.ai</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navGroups.map((group, gi) => (
            <div key={gi} className={gi > 0 ? "pt-4" : ""}>
              {group.title && (
                <p className="px-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-violet-50 text-violet-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        size={18}
                        className={isActive ? "text-violet-600" : "text-gray-400"}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-semibold px-1.5">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
              <span className="text-violet-700 text-xs font-semibold">FT</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Finance Team</p>
              <p className="text-xs text-gray-500 truncate">Denave</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
