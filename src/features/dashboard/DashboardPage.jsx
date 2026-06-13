import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { fetchDashboardData } from './dashboardSlice'
import { fetchNotifications } from '../notifications/notificationSlice'
import KpiCard from '../../components/common/KpiCard'
import Loader from '../../components/common/Loader'
import styles from './DashboardPage.module.css'

const deptSpend = [
  { dept: 'IT', spend: 420000 },
  { dept: 'Finance', spend: 280000 },
  { dept: 'Operations', spend: 195000 },
  { dept: 'HR', spend: 85000 },
  { dept: 'Admin', spend: 60000 }
]

const DashboardPage = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardData())
    dispatch(fetchNotifications())
  }, [dispatch])

  const kpis = useMemo(() => data ? [
    { title: 'Total Requests', value: data.totalRequests, icon: '📋', color: '#0052cc' },
    { title: 'Pending Approval', value: data.pendingRequests, icon: '⏳', color: '#ff8b00' },
    { title: 'Approved', value: data.approvedRequests, icon: '✅', color: '#36b37e' },
    { title: 'Rejected', value: data.rejectedRequests, icon: '❌', color: '#de350b' },
    { title: 'Total Vendors', value: data.totalVendors, icon: '🏢', color: '#6554c0' },
    { title: 'High Risk Vendors', value: data.highRiskVendors, icon: '⚠️', color: '#ff8b00' },
    { title: 'Total Risks', value: data.totalRisks, icon: '🔴', color: '#de350b' },
    { title: 'Open Risks', value: data.openRisks, icon: '🚨', color: '#de350b' }
  ] : [], [data])

  if (loading && !data) return <Loader />

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Executive Dashboard</h1>
        <span className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div className={styles.kpiGrid}>
        {kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Risk Trend (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data?.riskTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#de350b" strokeWidth={2} name="High" />
              <Line type="monotone" dataKey="medium" stroke="#ff8b00" strokeWidth={2} name="Medium" />
              <Line type="monotone" dataKey="low" stroke="#36b37e" strokeWidth={2} name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Department Spending</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deptSpend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dept" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => [`$${v.toLocaleString()}`, 'Spend']} />
              <Bar dataKey="spend" fill="#0052cc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.activityCard}>
        <h3 className={styles.chartTitle}>Recent Activity</h3>
        {data?.recentActivity?.map(item => (
          <div key={item.id} className={styles.activityItem}>
            <span className={styles.activityDot} />
            <div>
              <div className={styles.activityText}>{item.action}</div>
              <div className={styles.activityTime}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage