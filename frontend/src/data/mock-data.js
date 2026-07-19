export const dashboardStats = {
  totalCommission: 84732150,
  employeesProcessed: { current: 3742, total: 4012 },
  averageCommission: 22644,
  budgetUtilization: 78.4,
  pendingApprovals: 23,
  urgentApprovals: 3,
  pnlImpact: 357845000,
  revenuePercentage: 23.7,
}

export const workflowSteps = [
  { step: 1, label: 'Plan Builder', status: 'completed', detail: '20 Plans Active' },
  { step: 2, label: 'Performance Intake', status: 'completed', detail: '100% Complete' },
  { step: 3, label: 'Calculate', status: 'completed', detail: '3,742 Calculated' },
  { step: 4, label: 'Validate', status: 'active', detail: '8 Exceptions' },
  { step: 5, label: 'Approvals', status: 'pending', detail: '23 Pending' },
  { step: 6, label: 'Payout', status: 'pending', detail: 'Not Started' },
]

export const validationAlerts = [
  { id: 1, type: 'danger', label: 'High Commission Anomalies', count: 3 },
  { id: 2, type: 'warning', label: 'Cap Breaches', count: 2 },
  { id: 3, type: 'warning', label: 'Data Quality Issues', count: 3 },
  { id: 4, type: 'success', label: 'Rule Conflicts', count: 0 },
]

export const commissionTrend = [
  { month: 'Apr', current: 5200000, previous: 4800000 },
  { month: 'May', current: 5800000, previous: 5100000 },
  { month: 'Jun', current: 6100000, previous: 5400000 },
  { month: 'Jul', current: 6500000, previous: 5900000 },
  { month: 'Aug', current: 7200000, previous: 6200000 },
  { month: 'Sep', current: 7800000, previous: 6500000 },
  { month: 'Oct', current: 8473215, previous: 6921145 },
  { month: 'Nov', current: null, previous: 7100000 },
  { month: 'Dec', current: null, previous: 7500000 },
  { month: 'Jan', current: null, previous: 7800000 },
  { month: 'Feb', current: null, previous: 8100000 },
  { month: 'Mar', current: null, previous: 8400000 },
]

export const departmentData = [
  { name: 'Sales', value: 32400000, percentage: 38.3, color: '#7C6BFF' },
  { name: 'Field Sales', value: 21800000, percentage: 25.8, color: '#38BDF8' },
  { name: 'Customer Success', value: 11200000, percentage: 13.2, color: '#10B981' },
  { name: 'Operations', value: 7712000, percentage: 9.1, color: '#F59E0B' },
  { name: 'Others', value: 11500000, percentage: 13.6, color: '#94A3B8' },
]

export const topEarners = [
  { rank: 1, name: 'Vikash Kumar', initials: 'VK', color: '#10B981', amount: 245678, growth: 15.2 },
  { rank: 2, name: 'Neha Singh', initials: 'NS', color: '#38BDF8', amount: 218456, growth: 12.8 },
  { rank: 3, name: 'Arjun Patel', initials: 'AP', color: '#7C6BFF', amount: 198765, growth: 10.3 },
  { rank: 4, name: 'Priya Sharma', initials: 'PS', color: '#F59E0B', amount: 185432, growth: 8.7 },
  { rank: 5, name: 'Rohit Verma', initials: 'RV', color: '#EF4444', amount: 172345, growth: 7.1 },
]

export const recentApprovals = [
  { id: 1, plan: 'Monthly Payout – Oct 2024', period: 'Oct 2024', amount: 62456780, requestedBy: 'Priya Sharma', level: 'L1', status: 'pending', date: '28 Oct 2024' },
  { id: 2, plan: 'SPIFF – Product Launch', period: 'Oct 2024', amount: 4567890, requestedBy: 'Rahul Verma', level: 'L2', status: 'pending', date: '28 Oct 2024' },
  { id: 3, plan: 'Manager Bonus – Q3', period: 'Q3 2024', amount: 11234560, requestedBy: 'Anita Desai', level: 'L1', status: 'approved', date: '27 Oct 2024' },
  { id: 4, plan: 'Quarterly Accelerators', period: 'Q3 2024', amount: 21890450, requestedBy: 'Vikash Kumar', level: 'L3', status: 'approved', date: '27 Oct 2024' },
  { id: 5, plan: 'Retention Bonus – Sep', period: 'Sep 2024', amount: 3845210, requestedBy: 'Neha Singh', level: 'L2', status: 'rejected', date: '26 Oct 2024' },
]

export const pnlSummary = {
  revenue: 357845000,
  commissionAccrual: 84732150,
  commissionPercentage: 23.7,
  budget: 108000000,
  budgetVariance: -23267850,
  budgetUtilization: 78.4,
}

export const plans = [
  { id: 'PLAN-TS-TIER', name: 'Telesales Tiered Commission', type: 'Tiered', role: 'Telesales Agent', status: 'active', employees: 520, version: 3, effectiveDate: '2024-04-01' },
  { id: 'PLAN-FS-FLAT', name: 'Field Sales Revenue Share', type: 'Flat %', role: 'Field Sales Exec', status: 'active', employees: 280, version: 2, effectiveDate: '2024-04-01' },
  { id: 'PLAN-ACC-HP', name: 'Accelerator – High Performer', type: 'Accelerator', role: 'Field Sales Exec', status: 'active', employees: 85, version: 4, effectiveDate: '2024-07-01' },
  { id: 'PLAN-TL-TEAM', name: 'Team Leader Performance Bonus', type: 'Team Bonus', role: 'Team Leader', status: 'active', employees: 150, version: 2, effectiveDate: '2024-04-01' },
  { id: 'PLAN-SPIFF-Q3', name: 'Q3 SPIFF – New Product Launch', type: 'SPIFF', role: 'All Roles', status: 'active', employees: 1200, version: 1, effectiveDate: '2024-07-01' },
  { id: 'PLAN-MGR-OVR', name: 'Manager Override Commission', type: 'Override', role: 'Manager', status: 'active', employees: 45, version: 3, effectiveDate: '2024-04-01' },
  { id: 'PLAN-SM-MILE', name: 'Senior Manager Milestone', type: 'Milestone', role: 'Senior Manager', status: 'draft', employees: 12, version: 1, effectiveDate: '2025-01-01' },
]

export const performanceData = [
  { id: 1, source: 'CRM – Salesforce', records: 3742, status: 'completed', lastSync: '28 Oct 2024, 09:00 AM', quality: 98.2 },
  { id: 2, source: 'Attendance – BambooHR', records: 4012, status: 'completed', lastSync: '28 Oct 2024, 08:30 AM', quality: 99.8 },
  { id: 3, source: 'Call Logs – Ozonetel', records: 28450, status: 'completed', lastSync: '28 Oct 2024, 09:15 AM', quality: 96.5 },
  { id: 4, source: 'Quality Scores – Internal', records: 3200, status: 'warning', lastSync: '27 Oct 2024, 06:00 PM', quality: 92.1 },
  { id: 5, source: 'Target Sheet – Excel', records: 4012, status: 'completed', lastSync: '01 Oct 2024, 10:00 AM', quality: 100 },
]

export const validationResults = [
  { id: 1, empId: 'DN-5023', name: 'Rahul Sharma', issue: 'Commission exceeds 3x average', severity: 'high', amount: 89500, recommendation: 'Review performance data for Oct. Possible data entry error in CRM conversions.' },
  { id: 2, empId: 'DN-5089', name: 'Priya Gupta', issue: 'Cap breach – Plan PLAN-TS-TIER', severity: 'high', amount: 52000, recommendation: 'Commission of ₹52,000 exceeds cap of ₹45,000. Apply cap or request exception.' },
  { id: 3, empId: 'DN-5142', name: 'Amit Kumar', issue: 'Duplicate commission entry', severity: 'medium', amount: 34200, recommendation: 'Same employee has two calculations for Oct. Remove duplicate entry.' },
  { id: 4, empId: 'DN-5201', name: 'Sneha Verma', issue: 'Missing attendance data', severity: 'medium', amount: 0, recommendation: 'Attendance data missing for 5 days. Verify with HR before calculation.' },
  { id: 5, empId: 'DN-5067', name: 'Vikram Singh', issue: 'Negative clawback exceeds earnings', severity: 'high', amount: -15000, recommendation: 'Clawback of ₹15,000 exceeds current commission. Cap clawback at current earnings.' },
  { id: 6, empId: 'DN-5298', name: 'Anita Reddy', issue: 'Rule conflict – overlapping tiers', severity: 'low', amount: 28900, recommendation: 'Tier 2 and Tier 3 overlap at 100% achievement. No financial impact – cosmetic fix.' },
  { id: 7, empId: 'DN-5156', name: 'Raj Nair', issue: 'Budget threshold exceeded for Vodafone', severity: 'high', amount: 1250000, recommendation: 'Vodafone account commission at 92% of monthly budget. Alert finance team.' },
  { id: 8, empId: 'DN-5312', name: 'Meera Pillai', issue: 'Quality score below threshold', severity: 'medium', amount: 18500, recommendation: 'QA score 62% is below 70% minimum. Commission should be prorated or held.' },
]

export const approvalWorkflows = [
  { id: 1, plan: 'Monthly Payout – Oct 2024', amount: 62456780, employees: 3742, initiatedBy: 'System', initiatedDate: '28 Oct 2024', currentLevel: 'Sales Manager', status: 'in_progress', levels: [
    { level: 'Sales Manager', approver: 'Vikash Kumar', status: 'approved', date: '28 Oct 2024', comment: 'All calculations verified' },
    { level: 'Finance', approver: 'Priya Sharma', status: 'pending', date: null, comment: null },
    { level: 'HR', approver: 'Anita Desai', status: 'pending', date: null, comment: null },
    { level: 'Payroll', approver: 'System', status: 'pending', date: null, comment: null },
  ]},
  { id: 2, plan: 'SPIFF – Product Launch', amount: 4567890, employees: 1200, initiatedBy: 'Rahul Verma', initiatedDate: '27 Oct 2024', currentLevel: 'Finance', status: 'in_progress', levels: [
    { level: 'Sales Manager', approver: 'Rohit Verma', status: 'approved', date: '27 Oct 2024', comment: 'SPIFF criteria met' },
    { level: 'Finance', approver: 'Priya Sharma', status: 'pending', date: null, comment: null },
    { level: 'HR', approver: 'Anita Desai', status: 'pending', date: null, comment: null },
    { level: 'Payroll', approver: 'System', status: 'pending', date: null, comment: null },
  ]},
]

export const employees = [
  { id: 'DN-5000', name: 'Rahul Sharma', role: 'Telesales Agent', account: 'Vodafone', region: 'North', plan: 'PLAN-TS-TIER', achievement: 128, commission: 34500, status: 'approved' },
  { id: 'DN-5001', name: 'Priya Gupta', role: 'Telesales Agent', account: 'Airtel', region: 'South', plan: 'PLAN-TS-TIER', achievement: 115, commission: 28900, status: 'pending' },
  { id: 'DN-5002', name: 'Amit Kumar', role: 'Field Sales Exec', account: 'HDFC Bank', region: 'West', plan: 'PLAN-FS-FLAT', achievement: 142, commission: 67200, status: 'approved' },
  { id: 'DN-5003', name: 'Sneha Verma', role: 'Field Sales Exec', account: 'Jio', region: 'East', plan: 'PLAN-ACC-HP', achievement: 95, commission: 42100, status: 'pending' },
  { id: 'DN-5004', name: 'Vikram Singh', role: 'Team Leader', account: 'Bajaj Finance', region: 'Central', plan: 'PLAN-TL-TEAM', achievement: 108, commission: 55800, status: 'approved' },
  { id: 'DN-5005', name: 'Anita Reddy', role: 'Manager', account: 'Amazon', region: 'South', plan: 'PLAN-MGR-OVR', achievement: 112, commission: 89200, status: 'approved' },
  { id: 'DN-5006', name: 'Raj Nair', role: 'Senior Manager', account: 'Samsung', region: 'North', plan: 'PLAN-SM-MILE', achievement: 105, commission: 125000, status: 'pending' },
]

export const disputes = [
  { id: 'DSP-001', empId: 'DN-5023', name: 'Rahul Sharma', category: 'Incorrect Calculation', description: 'October commission does not include 3 deals closed on 30th', amount: 12500, status: 'open', createdDate: '29 Oct 2024', resolvedDate: null },
  { id: 'DSP-002', empId: 'DN-5089', name: 'Priya Gupta', category: 'Missing Performance', description: 'Attendance marked incorrect for 5 days in October', amount: 8200, status: 'under_review', createdDate: '28 Oct 2024', resolvedDate: null },
  { id: 'DSP-003', empId: 'DN-5142', name: 'Amit Kumar', category: 'Wrong Plan Applied', description: 'Should be on Accelerator plan, not Flat plan', amount: 25000, status: 'resolved', createdDate: '25 Oct 2024', resolvedDate: '27 Oct 2024' },
  { id: 'DSP-004', empId: 'DN-5201', name: 'Sneha Verma', category: 'Cap Dispute', description: 'Cap should not apply for new joiners in first 3 months', amount: 7000, status: 'escalated', createdDate: '26 Oct 2024', resolvedDate: null },
]

export const auditLogs = [
  { id: 1, timestamp: '2024-10-28 14:23:45', user: 'Anita Desai', action: 'COMMISSION_CALCULATE', details: 'Batch calculation for Oct 2024 – 3,742 employees', oldValue: '', newValue: '₹ 8,47,32,150' },
  { id: 2, timestamp: '2024-10-28 14:20:12', user: 'System', action: 'DATA_IMPORT', details: 'CRM data imported – 3,742 records', oldValue: '', newValue: '3742 records' },
  { id: 3, timestamp: '2024-10-28 12:15:30', user: 'Vikash Kumar', action: 'PLAN_UPDATE', details: 'Updated PLAN-TS-TIER – Tier 3 rate changed', oldValue: '350', newValue: '400' },
  { id: 4, timestamp: '2024-10-28 11:45:00', user: 'Priya Sharma', action: 'APPROVAL_ACTION', details: 'Approved Monthly Payout – Oct 2024', oldValue: 'Pending', newValue: 'Approved' },
  { id: 5, timestamp: '2024-10-27 16:30:22', user: 'Rahul Verma', action: 'DISPUTE_CREATE', details: 'New dispute DSP-001 raised', oldValue: '', newValue: 'DSP-001' },
  { id: 6, timestamp: '2024-10-27 15:10:45', user: 'System', action: 'AI_VALIDATION', details: 'Anomaly scan completed – 8 issues found', oldValue: '', newValue: '8 anomalies' },
  { id: 7, timestamp: '2024-10-27 14:00:00', user: 'Anita Desai', action: 'PLAN_PUBLISH', details: 'Published PLAN-SPIFF-Q3', oldValue: 'Draft', newValue: 'Active' },
  { id: 8, timestamp: '2024-10-26 09:30:15', user: 'System', action: 'SYSTEM_BACKUP', details: 'Automated daily backup completed', oldValue: '', newValue: 'Backup ID: BK-20241026' },
]

export const analyticsData = {
  commissionROI: 3.2,
  revenuePerRupeeCommission: 4.22,
  avgPayoutTime: 3.5,
  disputeResolutionRate: 94,
  topDepartments: [
    { name: 'Sales', commission: 32400000, revenue: 125000000, roi: 3.86 },
    { name: 'Field Sales', commission: 21800000, revenue: 89000000, roi: 4.08 },
    { name: 'Customer Success', commission: 11200000, revenue: 38000000, roi: 3.39 },
    { name: 'Operations', commission: 7712000, revenue: 28000000, roi: 3.63 },
  ],
  monthlyTrend: [
    { month: 'Apr', commission: 5200000, revenue: 22000000 },
    { month: 'May', commission: 5800000, revenue: 24500000 },
    { month: 'Jun', commission: 6100000, revenue: 26000000 },
    { month: 'Jul', commission: 6500000, revenue: 28000000 },
    { month: 'Aug', commission: 7200000, revenue: 31000000 },
    { month: 'Sep', commission: 7800000, revenue: 33500000 },
    { month: 'Oct', commission: 8473215, revenue: 35784500 },
  ],
}
