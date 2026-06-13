import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../store/uiSlice'
import styles from '../dashboard/DashboardPage.module.css'

const SettingsPage = () => {
  const { user } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.ui)
  const dispatch = useDispatch()

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Settings</h1>
      </div>
      <div className={styles.chartCard} style={{ maxWidth: 600 }}>
        <h3 className={styles.chartTitle}>Profile Information</h3>
        <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
          {[['Name', user?.name], ['Email', user?.email], ['Role', user?.role], ['Department', user?.department]].map(([label, value]) => (
            <div key={label}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
              <div style={{ fontSize: 15, color: 'var(--text-primary)', marginTop: 4, padding: '8px 12px', background: '#f4f6f9', borderRadius: 6 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chartCard} style={{ maxWidth: 600 }}>
        <h3 className={styles.chartTitle}>Theme</h3>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          {['light', 'dark'].map(t => (
            <button key={t} onClick={() => dispatch(setTheme(t))}
              style={{ padding: '10px 24px', borderRadius: 8, border: `2px solid ${theme === t ? 'var(--primary)' : 'var(--border)'}`, background: theme === t ? 'var(--primary)' : '#fff', color: theme === t ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize' }}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage