import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComplianceData } from './complianceSlice'
import KpiCard from '../../components/common/KpiCard'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import Loader from '../../components/common/Loader'
import styles from '../dashboard/DashboardPage.module.css'

const columns = [
  { key: 'id', label: 'Vendor ID' },
  { key: 'name', label: 'Vendor Name' },
  { key: 'complianceScore', label: 'Score', render: v => `${v}%` },
  { key: 'certExpiry', label: 'Cert Expiry' },
  { key: 'riskLevel', label: 'Risk', render: v => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> }
]

const ComplianceCenterPage = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.compliance)

  useEffect(() => { dispatch(fetchComplianceData()) }, [dispatch])

  if (loading && !data) return <Loader />

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Compliance Center</h1>
      </div>
      {data && (
        <>
          <div className={styles.kpiGrid}>
            <KpiCard title="Total Checked" value={data.totalChecked} icon="🔍" color="#0052cc" />
            <KpiCard title="Compliant" value={data.compliant} icon="✅" color="#36b37e" />
            <KpiCard title="Violations" value={data.violations} icon="❌" color="#de350b" />
            <KpiCard title="Expired Certs" value={data.expiredCertifications.length} icon="📄" color="#ff8b00" />
          </div>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Low Compliance Vendors</h3>
            <DataTable columns={columns} data={data.lowComplianceVendors} loading={loading} />
          </div>
        </>
      )}
    </div>
  )
}

export default ComplianceCenterPage