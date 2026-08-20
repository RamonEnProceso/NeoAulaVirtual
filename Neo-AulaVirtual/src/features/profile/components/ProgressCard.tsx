import { Link } from 'react-router-dom'
import ProgressBar from '../../../shared/components/ProgressBar'
import { currentProfile } from '../../../shared/profile'
import styles from './ProgressCard.module.css'

function ProgressCard() {
  const career = currentProfile.carrera?? "";

  return (
    <Link to="/avance" className={styles.card}>
      <div className={styles.row}>
        <p className={styles.greeting}>{career}</p>
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
      <ProgressBar value={currentProfile.avance ?? 0} />
    </Link>
  )
}

export default ProgressCard
