import { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchRequests, setFilter } from './procurementSlice'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import styles from './ProcurementListPage.module.css'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'department', label: 'Department' },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'amount', label: 'Amount', render: (v) => `$${v.toLocaleString()}` },
  { key: 'priority', label: 'Priority', render: (v) => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'createdAt', label: 'Date' }
]

const ProcurementListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { requests, loading, filters } = useSelector(state => state.procurement)
  const [search, setSearch] = useState('')

  useEffect(() => { dispatch(fetchRequests()) }, [dispatch])

  const filtered = useMemo(() => requests.filter(r => {
    const matchStatus = filters.status === 'All' || r.status === filters.status
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.requestedBy.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  }), [requests, filters.status, search])

  const handleRowClick = useCallback((row) => navigate(`/procurement/${row.id}`), [navigate])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Procurement Requests</h1>
        <button className={styles.addBtn} onClick={() => alert('Create request modal - implement as needed')}>
          + New Request
        </button>
      </div>

      <div className={styles.filters}>
        <input className={styles.search} placeholder="Search requests..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className={styles.statusFilters}>
          {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
            <button key={s} className={`${styles.filterBtn} ${filters.status === s ? styles.active : ''}`}
              onClick={() => dispatch(setFilter({ status: s }))}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={handleRowClick} loading={loading} />
    </div>
  )
}

export default ProcurementListPage