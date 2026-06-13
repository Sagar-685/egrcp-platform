import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVendorById } from './vendorSlice'
import StatusBadge from '../../components/common/StatusBadge'
import Loader from '../../components/common/Loader'
import styles from '../../features/procurement/ProcurementDetailPage.module.css'

const VendorDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedVendor, loading } = useSelector(state => state.vendors)

  useEffect(() => { dispatch(fetchVendorById(id)) }, [dispatch, id])

  if (loading || !selectedVendor) return <Loader />

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/vendors')}>← Back to Vendors</button>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>{selectedVendor.name}</h1>
          <span className={styles.id}>{selectedVendor.id} · {selectedVendor.category}</span>
        </div>
        <StatusBadge status={selectedVendor.status} />
      </div>
      <div className={styles.content}>
        <div className={styles.detailGrid}>
          {[
            ['Contact', selectedVendor.contact],
            ['Country', selectedVendor.country],
            ['Risk Level', selectedVendor.riskLevel],
            ['Compliance Score', `${selectedVendor.complianceScore}%`],
            ['Cert Expiry', selectedVendor.certExpiry],
            ['Total Spend', `$${selectedVendor.spend?.toLocaleString()}`]
          ].map(([label, value]) => (
            <div key={label} className={styles.detailItem}>
              <div className={styles.detailLabel}>{label}</div>
              <div className={styles.detailValue}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VendorDetailPage