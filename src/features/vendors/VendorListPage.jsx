import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchVendors } from './vendorSlice'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import styles from '../../features/procurement/ProcurementListPage.module.css'

const columns = [
  { key: 'id', label: 'Vendor ID' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'country', label: 'Country' },
  { key: 'complianceScore', label: 'Compliance Score', render: v => `${v}%` },
  { key: 'riskLevel', label: 'Risk Level', render: v => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  { key: 'spend', label: 'Total Spend', render: v => `$${v.toLocaleString()}` }
]

const VendorListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { vendors, loading } = useSelector(state => state.vendors)

  useEffect(() => { dispatch(fetchVendors()) }, [dispatch])

  const handleRowClick = useCallback((row) => navigate(`/vendors/${row.id}`), [navigate])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vendor Governance</h1>
        <button className={styles.addBtn}>+ Add Vendor</button>
      </div>
      <DataTable columns={columns} data={vendors} onRowClick={handleRowClick} loading={loading} />
    </div>
  )
}

export default VendorListPage