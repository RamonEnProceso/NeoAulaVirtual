import { Link } from 'react-router-dom'
import { currentProfile } from '../../../shared/profile'
import { calcPesoAcademico, tonoPesoAcademico, estadoPesoAcademico } from '../logic/calcPesoAcademico'
import type { ScoreTone } from '../logic/calcPesoAcademico'
import styles from './PesoAcademico.module.css'

const TONO: Record<ScoreTone, string> = {
  red: styles.red,
  amber: styles.amber,
  green: styles.green,
}

function PesoAcademicoCard() {
  const score = calcPesoAcademico(currentProfile)
  const estado = estadoPesoAcademico(score)

  return (
    <Link to="/peso" className={`${styles.card} ${TONO[tonoPesoAcademico(score)]}`}>
      <div className={styles.info}>
        <p className={styles.label}>Peso académico</p>
        <span className={styles.estado}>{estado}</span>
      </div>
      <div className={styles.box}>
        <span className={styles.number}>{score}</span>
      </div>
      <span className={styles.chevron} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  )
}

export default PesoAcademicoCard
