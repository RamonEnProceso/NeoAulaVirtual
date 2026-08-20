import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '../../assets/icons/Home.svg?react'
import SubjectsIcon from '../../assets/icons/Subjects.svg?react'
import BellIcon from '../../assets/icons/Bell.svg?react'
import Avatar from './Avatar'
import { currentProfile } from '../profile'
import styles from './NavMenu.module.css'

interface NavItem {
  to: string
  label: string
  icon: ReactNode
}

const items: NavItem[] = [
  { to: '/', label: 'Inicio', icon: <HomeIcon aria-hidden="true" /> },
  { to: '/materias', label: 'Materias', icon: <SubjectsIcon aria-hidden="true" /> },
  { to: '/notificaciones', label: 'Notificaciones', icon: <BellIcon aria-hidden="true" /> },
  { to: '/perfil', label: 'Perfil', icon: <Avatar src={currentProfile.photo} size={28} /> },
]

function NavMenu() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <ul className={styles.list}>
        {items.map(({ to, label, icon }) => (
          <li key={to} className={styles.item}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`
              }
            >
              {icon}
              <span className={styles.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavMenu
