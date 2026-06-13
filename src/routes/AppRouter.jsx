import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import Loader from '../components/common/Loader'

// Lazy loading for code splitting
const Login = lazy(() => import('../features/auth/LoginPage'))
const ForgotPassword = lazy(() => import('../features/auth/ForgotPasswordPage'))
const Dashboard = lazy(() => import('../features/dashboard/DashboardPage'))
const ProcurementList = lazy(() => import('../features/procurement/ProcurementListPage'))
const ProcurementDetail = lazy(() => import('../features/procurement/ProcurementDetailPage'))
const VendorList = lazy(() => import('../features/vendors/VendorListPage'))
const VendorDetail = lazy(() => import('../features/vendors/VendorDetailPage'))
const RiskCenter = lazy(() => import('../features/risk/RiskCenterPage'))
const ComplianceCenter = lazy(() => import('../features/compliance/ComplianceCenterPage'))
const AuditCenter = lazy(() => import('../features/audit/AuditCenterPage'))
const ReportCenter = lazy(() => import('../features/reports/ReportCenterPage'))
const Settings = lazy(() => import('../features/settings/SettingsPage'))

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/procurement" element={<ProcurementList />} />
            <Route path="/procurement/:id" element={<ProcurementDetail />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendors/:id" element={<VendorDetail />} />
            <Route path="/risk" element={<RiskCenter />} />
            <Route path="/compliance" element={<ComplianceCenter />} />
            <Route path="/audit" element={<AuditCenter />} />
            <Route path="/reports" element={<ReportCenter />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default AppRouter
