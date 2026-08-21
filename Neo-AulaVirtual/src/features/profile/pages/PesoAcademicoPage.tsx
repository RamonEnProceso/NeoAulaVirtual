import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import { currentProfile } from '../../../shared/profile'
import { calcPesoAcademico, tonoPesoAcademico, estadoPesoAcademico, tonoValor } from '../logic/calcPesoAcademico'
import type { ScoreTone, Tone } from '../logic/calcPesoAcademico'
import BackButton from '../../../shared/components/BackButton'
import styles from './PesoAcademicoPage.module.css'
import PesoPolinomioCard from '../components/PesoPolinomio'

const TONO_HERO: Record<ScoreTone, string> = {
  red: styles.heroRed,
  amber: styles.heroAmber,
  green: styles.heroGreen,
}

const TONO_BADGE: Record<Tone, string> = {
  red: styles.badgeRed,
  amber: styles.badgeAmber,
  green: styles.badgeGreen,
  gray: styles.badgeGrey,
}

function PesoAcademicoPage() {
  const { pesoAcademico } = currentProfile
  const navigate = useNavigate()
  const score = calcPesoAcademico(currentProfile)
  const tono = tonoPesoAcademico(score)
  const estado = estadoPesoAcademico(score)

  const stats: { label: string; detalle: string; valor: number; tono: ScoreTone }[] = [
    { label: 'Materias aprobadas', detalle: 'totales', valor: pesoAcademico.map_total, tono: 'green' },
    { label: 'Finales adeudados', detalle: 'totales', valor: pesoAcademico.fad_total, tono: 'red' },
    { label: 'Finales ausentes', detalle: 'último ciclo', valor: pesoAcademico.fau_ciclo, tono: 'red' },
    { label: 'Materias abandonadas', detalle: 'último ciclo', valor: pesoAcademico.mab_ciclo, tono: 'red' },
    { label: 'Materias regularizadas', detalle: 'último ciclo', valor: pesoAcademico.mr_ciclo, tono: 'amber' },
  ]

  return (
    <main className={styles.page}>
      <ProfileHeader />
      <div className={styles.body}>
        <div className={styles.headerTop}>
          <h1 className={styles.titulo}>Peso Académico</h1>
          <BackButton onClick={() => navigate(-1)} />
        </div>

        {/* Score general */}
        <section className={`${styles.hero} ${TONO_HERO[tono]}`}>
          <div className={styles.heroInfo}>
            <p className={styles.heroLabel}>Tu peso académico</p>
            <span className={`${styles.estado} ${TONO_BADGE[tono]}`}>{estado}</span>
          </div>
          <div className={styles.heroBox}>
            <span className={styles.heroScore}>{score}</span>
          </div>
        </section>

        <PesoPolinomioCard />

        {/* Desglose */}
        <section className={styles.card}>
          <ul className={styles.lista}>
            {stats.map(({ label, detalle, valor, tono }) => (
              <li key={label} className={styles.fila}>
                <div>
                  <p className={styles.filaLabel}>{label}</p>
                  <p className={styles.filaDetalle}>{detalle}</p>
                </div>
                <span className={`${styles.badge} ${TONO_BADGE[tonoValor(tono, valor)]}`}>{valor}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default PesoAcademicoPage
