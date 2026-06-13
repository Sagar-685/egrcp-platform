import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequestById } from './procurementSlice'
import StatusBadge from '../../components/common/StatusBadge'
import Loader from '../../components/common/Loader'
import styles from './ProcurementDetailPage.module.css'

const tabs = ['Overview', 'Attachments', 'Approval History', 'Comments', 'Audit Logs']

const ProcurementDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedRequest, loading } = useSelector(state => state.procurement)
  const [activeTab, setActiveTab] = useState('Overview')

  useEffect(() => { dispatch(fetchRequestById(id)) }, [dispatch, id])

  if (loading || !selectedRequest) return <Loader />

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/procurement')}>← Back to Procurement</button>

      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>{selectedRequest.title}</h1>
          <span className={styles.id}>{selectedRequest.id}</span>
        </div>
        <StatusBadge status={selectedRequest.status} />
      </div>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'Overview' && (
          <div className={styles.detailGrid}>
            {[
              ['Request ID', selectedRequest.id],
              ['Department', selectedRequest.department],
              ['Requested By', selectedRequest.requestedBy],
              ['Amount', `$${selectedRequest.amount?.toLocaleString()}`],
              ['Priority', selectedRequest.priority],
              ['Status', selectedRequest.status],
              ['Category', selectedRequest.category],
              ['Date Created', selectedRequest.createdAt],
              ['Vendor', selectedRequest.vendor]
            ].map(([label, value]) => (
              <div key={label} className={styles.detailItem}>
                <div className={styles.detailLabel}>{label}</div>
                <div className={styles.detailValue}>{value}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab !== 'Overview' && (
          <div className={styles.emptyTab}>
            <p>No {activeTab.toLowerCase()} available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcurementDetailPage