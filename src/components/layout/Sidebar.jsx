import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../store/uiSlice'
import { logoutUser } from '../../features/auth/authSlice'
import styles from './Sidebar.module.css'

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/procurement', icon: '📋', label: 'Procurement' },
  { path: '/vendors', icon: '🏢', label: 'Vendors' },
  { path: '/risk', icon: '⚠️', label: 'Risk Center' },
  { path: '/compliance', icon: '✅', label: 'Compliance' },
  { path: '/audit', icon: '🔍', label: 'Audit Center' },
  { path: '/reports', icon: '📈', label: 'Reports' },
  { path: '/settings', icon: '⚙️', label: 'Settings' },
]

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sidebarOpen } = useSelector(state => state.ui)
  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⚡</span>
        {sidebarOpen && <span className={styles.logoText}>e-GRCP</span>}
      </div>

      {sidebarOpen && user && (
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user.avatar}</div>
          <div>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userRole}>{user.role}</div>
          </div>
        </div>
      )}

      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            title={!sidebarOpen ? item.label : ''}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {sidebarOpen && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        <span>🚪</span>
        {sidebarOpen && <span>Logout</span>}
      </button>

      <button className={styles.toggleBtn} onClick={() => dispatch(toggleSidebar())}>
        {sidebarOpen ? '◀' : '▶'}
      </button>
    </aside>
  )
}

export default Sidebar
