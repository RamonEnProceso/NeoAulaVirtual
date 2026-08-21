import { Link } from 'react-router-dom'
import styles from './HorarioCard.module.css'

const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

function HorarioCard() {
  const hoy = new Date()

  return (
    <Link to="/horario" className={styles.card}>
      <div className={styles.fecha} aria-hidden="true">
        <span className={styles.dia}>{hoy.getDate()}</span>
        <span className={styles.mes}>{MESES[hoy.getMonth()]}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Horarios</span>
        <span className={styles.sub}>Tus materias de hoy</span>
      </div>
      <svg className={styles.chevron} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

export default HorarioCard
