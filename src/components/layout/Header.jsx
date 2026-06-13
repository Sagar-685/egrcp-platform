import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { markAllAsRead } from '../../features/notifications/notificationSlice'
import styles from './Header.module.css'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { notifications } = useSelector(state => state.notifications)
  const [search, setSearch] = useState('')
  const [showNotifs, setShowNotifs] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          placeholder="Search requests, vendors, risks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <div className={styles.notifWrapper}>
          <button className={styles.iconBtn} onClick={() => setShowNotifs(!showNotifs)}>
            🔔
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </button>
          {showNotifs && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifHeader}>
                <span>Notifications</span>
                <button onClick={() => dispatch(markAllAsRead())}>Mark all read</button>
              </div>
              {notifications.slice(0, 4).map(n => (
                <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}>
                  <div className={styles.notifTitle}>{n.title}</div>
                  <div className={styles.notifMsg}>{n.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.profile} onClick={() => navigate('/settings')}>
          <div className={styles.avatar}>{user?.avatar}</div>
          <span className={styles.userName}>{user?.name}</span>
        </div>
      </div>
    </header>
  )
}

export default Header