import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuditLogs } from './auditSlice'
import DataTable from '../../components/common/DataTable'
import styles from '../dashboard/DashboardPage.module.css'

const columns = [
  { key: 'id', label: '#' },
  { key: 'user', label: 'User' },
  { key: 'action', label: 'Action' },
  { key: 'module', label: 'Module' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'ip', label: 'IP Address' }
]

const AuditCenterPage = () => {
  const dispatch = useDispatch()
  const { logs, loading } = useSelector(state => state.audit)

  useEffect(() => { dispatch(fetchAuditLogs()) }, [dispatch])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Audit Center</h1>
        <button style={{ background: '#0052cc', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          Export Logs
        </button>
      </div>
      <div className={styles.chartCard}>
        <DataTable columns={columns} data={logs} loading={loading} />
      </div>
    </div>
  )
}

export default AuditCenterPage