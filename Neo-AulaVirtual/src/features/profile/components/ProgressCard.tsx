import { Link } from 'react-router-dom'
import ProgressBar from '../../../shared/components/ProgressBar'
import { carreraActual, useProgreso } from '../../../shared/progreso'
import { calcAvance } from '../../../shared/avance'
import styles from './ProgressCard.module.css'

function ProgressCard() {
  const progreso = useProgreso()
  const { carrera } = carreraActual()
  const { porcentaje } = calcAvance(carrera, progreso)

  return (
    <Link to="/avance" className={styles.card}>
      <div className={styles.row}>
        <p className={styles.greeting}>{carrera.version_abreviada}</p>
        <svg
          className={styles.chevron}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ProgressBar value={porcentaje} tone={porcentaje >= 100 ? 'green' : 'amber'} />
    </Link>
  )
}

export default ProgressCard
