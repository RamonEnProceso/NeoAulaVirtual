import { Link } from 'react-router-dom'
import { currentProfile } from '../../../shared/profile'
import styles from './PesoAcademico.module.css'
import { calcPesoAcademico } from '../logic/calcPesoAcademico';

function PesoAcademicoCard() {
  const pesoAcademico = currentProfile.pesoAcademico;

  return (
    <Link to="/peso" className={styles.card}>
        <div className={styles.container}>
            <div className={styles.left}>
                <p className={styles.number}>{calcPesoAcademico(currentProfile)}</p>
            </div>
            <div className={styles.right}>
                <p><span>MAp_t:</span> {pesoAcademico.map_total}</p>
                <p><span>FAd_t:</span> {pesoAcademico.fad_total}</p>
                <p><span>FAu_c:</span> {pesoAcademico.fau_ciclo}</p>
                <p><span>MAb_c:</span> {pesoAcademico.mab_ciclo}</p>
                <p><span>MR_c:</span> {pesoAcademico.mr_ciclo}</p>
            </div>
            <div className={styles.button}>
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
        </div>
    </Link>
  )
}

export default PesoAcademicoCard
