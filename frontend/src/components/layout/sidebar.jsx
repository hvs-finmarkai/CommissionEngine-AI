import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
  Users,
  MessageSquare,
  BarChart3,
  FileBarChart,
  Shield,
  Settings,
  ChevronLeft,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react'
import useAppStore from '@/hooks/use-app-store'

const navGroups = [
  {
    items: [{ label: 'Overview', icon: Home, path: '/' }],
  },
  {
    title: 'COMMISSION SETUP',
    items: [
      { label: 'Plan Builder', icon: FileText, path: '/plan-builder' },
      { label: 'Performance Intake', icon: Upload, path: '/performance-intake' },
      { label: 'Rule Engine', icon: Cpu, path: '/rule-engine' },
      { label: 'Commission Calculator', icon: Calculator, path: '/calculator' },
    ],
  },
  {
    title: 'MANAGE & VALIDATE',
    items: [
      {
        label: 'AI Validation',
        icon: Brain,
        path: '/ai-validation',
        badge: 8,
        children: [
          { label: 'Anomaly Detection', path: '/ai-validation/anomalies' },
          { label: 'Override Review', path: '/ai-validation/overrides' },
        ],
      },
      { label: 'Approvals', icon: CheckCircle, path: '/approvals', badge: 3 },
      { label: 'P&L Impact', icon: TrendingUp, path: '/pnl-impact' },
    ],
  },
  {
    title: 'EMPLOYEE & SUPPORT',
    items: [
      { label: 'Rep Portal', icon: User, path: '/rep-portal' },
      { label: 'Disputes', icon: MessageSquare, path: '/disputes' },
    ],
  },
  {
    title: 'ANALYTICS',
    items: [
      { label: 'Analytics', icon: BarChart3, path: '/analytics' },
      { label: 'Reports', icon: FileBarChart, path: '/reports' },
    ],
  },
]

const bottomNavigation = [
  { label: 'Admin / Users', icon: Users, path: '/admin' },
  { label: 'Audit Logs', icon: Shield, path: '/audit-logs' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const location = useLocation()
  const { sidebarCollapsed, toggleCollapse, theme, setTheme, user, logout } = useAppStore()
  const [expandedItems, setExpandedItems] = useState([])

  function toggleExpand(label) {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  function isActive(path) {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r transition-all duration-300',
        'bg-white dark:bg-[#0A1628] text-slate-800 dark:text-white border-gray-200 dark:border-gray-800',
        sidebarCollapsed ? 'w-[70px]' : 'w-[260px]'
      )}
    >
      <div className="flex h-16 items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7C6BFF]">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">CommissionEngine AI</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">AI-Powered Commission Platform</p>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="ml-auto rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform text-gray-500 dark:text-gray-400',
              sidebarCollapsed && 'rotate-180'
            )}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        <div className="space-y-0.5">
          {navGroups.map((group, gi) => (
            <div key={gi} className={gi > 0 ? 'pt-5' : ''}>
              {group.title && !sidebarCollapsed && (
                <p className="px-3 pb-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  {group.title}
                </p>
              )}
              {group.items.map(item => {
                const active = isActive(item.path)
                const expanded = expandedItems.includes(item.label)
                const hasChildren = item.children && item.children.length > 0

                return (
                  <div key={item.label}>
                    <div className="relative">
                      {hasChildren ? (
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'bg-[#7C6BFF]/10 text-[#7C6BFF]'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {!sidebarCollapsed && (
                            <>
                              <span className="flex-1 text-left truncate">{item.label}</span>
                              {item.badge && (
                                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 text-[10px] font-bold">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 shrink-0 transition-transform',
                                  expanded && 'rotate-180'
                                )}
                              />
                            </>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.path}
                          end={item.path === '/'}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'bg-[#7C6BFF] text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {!sidebarCollapsed && (
                            <>
                              <span className="truncate">{item.label}</span>
                              {item.badge && (
                                <span
                                  className={cn(
                                    'ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                                    active
                                      ? 'bg-white/20 text-white'
                                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                  )}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      )}
                    </div>
                    {hasChildren && expanded && !sidebarCollapsed && (
                      <div className="ml-5 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-700 pl-4">
                        {item.children.map(child => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={cn(
                              'block rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                              location.pathname === child.path
                                ? 'text-[#7C6BFF] bg-[#7C6BFF]/10'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            )}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-800 px-2 py-3 space-y-0.5">
        {bottomNavigation.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive(item.path)
                ? 'bg-[#7C6BFF]/10 text-[#7C6BFF]'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
        {!sidebarCollapsed && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 px-3 py-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        )}
        {!sidebarCollapsed && <SidebarUserMenu />}
      </div>
    </aside>
  )
}

function SidebarUserMenu() {
  const { user, logout } = useAppStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const displayName = user?.name || 'Anita Desai'
  const displayRole = user?.role || 'Finance Manager'
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <div ref={ref} className="relative mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7C6BFF] text-xs font-bold text-white">
          {initials}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{displayName}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 capitalize">{displayRole}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-gray-400 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="absolute bottom-full left-2 right-2 mb-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0F1D32] py-1 shadow-lg">
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <User className="h-4 w-4" />
            Profile
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
