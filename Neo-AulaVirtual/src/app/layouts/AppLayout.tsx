import { Outlet } from 'react-router-dom'
import NavMenu from '../../shared/components/NavMenu'
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <NavMenu />
    </div>
  )
}

export default AppLayout
