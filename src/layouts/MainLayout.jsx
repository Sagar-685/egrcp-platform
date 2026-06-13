import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import styles from './MainLayout.module.css'

const MainLayout = () => {
  const sidebarOpen = useSelector(state => state.ui.sidebarOpen)

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={`${styles.main} ${!sidebarOpen ? styles.collapsed : ''}`}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout