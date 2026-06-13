import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { fetchRisks } from './riskSlice'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import KpiCard from '../../components/common/KpiCard'
import Loader from '../../components/common/Loader'
import styles from '../dashboard/DashboardPage.module.css'

const columns = [
  { key: 'id', label: 'Risk ID' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'severity', label: 'Severity', render: v => <StatusBadge status={v} /> },
  { key: 'likelihood', label: 'Likelihood', render: v => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  { key: 'owner', label: 'Owner' },
  { key: 'dueDate', label: 'Due Date' }
]

const COLORS = ['#de350b', '#ff8b00', '#36b37e', '#0052cc']

const RiskCenterPage = () => {
  const dispatch = useDispatch()
  const { risks, loading } = useSelector(state => state.risk)

  useEffect(() => { dispatch(fetchRisks()) }, [dispatch])

  if (loading && !risks.length) return <Loader />

  const byCategory = ['Financial', 'Cybersecurity', 'Compliance', 'Operational'].map(cat => ({
    name: cat, value: risks.filter(r => r.category === cat).length
  }))

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Risk Center</h1>
      </div>
      <div className={styles.kpiGrid}>
        <KpiCard title="Total Risks" value={risks.length} icon="⚠️" color="#de350b" />
        <KpiCard title="Open" value={risks.filter(r => r.status === 'Open').length} icon="🚨" color="#de350b" />
        <KpiCard title="In Progress" value={risks.filter(r => r.status === 'In Progress').length} icon="🔄" color="#ff8b00" />
        <KpiCard title="Mitigated" value={risks.filter(r => r.status === 'Mitigated').length} icon="✅" color="#36b37e" />
      </div>
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Risk by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartCard} style={{ flex: 1 }}>
          <h3 className={styles.chartTitle}>Risk Register</h3>
          <DataTable columns={columns} data={risks} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default RiskCenterPage