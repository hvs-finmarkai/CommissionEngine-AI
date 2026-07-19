import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/layout'
import Dashboard from './pages/dashboard'
import PlanBuilder from './pages/plan-builder'
import PerformanceIntake from './pages/performance-intake'
import RuleEngine from './pages/rule-engine'
import Calculator from './pages/calculator'
import AIValidation from './pages/ai-validation'
import Approvals from './pages/approvals'
import PnLImpact from './pages/pnl-impact'
import RepPortal from './pages/rep-portal'
import Disputes from './pages/disputes'
import Analytics from './pages/analytics'
import Reports from './pages/reports'
import AuditLogs from './pages/audit-logs'
import Settings from './pages/settings'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan-builder" element={<PlanBuilder />} />
            <Route path="/performance-intake" element={<PerformanceIntake />} />
            <Route path="/rule-engine" element={<RuleEngine />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/ai-validation" element={<AIValidation />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/pnl-impact" element={<PnLImpact />} />
            <Route path="/rep-portal" element={<RepPortal />} />
            <Route path="/disputes" element={<Disputes />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
