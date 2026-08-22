import { useNavigate } from 'react-router-dom'
import Pendientes from '../../../shared/components/Pendientes'
import BackButton from '../../../shared/components/BackButton'
import styles from './PendientesPage.module.css'

function PendientesPage() {
  const navigate = useNavigate()

  return (
    <main className={`${styles.page} ${styles.pageHero}`}>
      <header className={styles.hero}>
        <div className={styles.back}>
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h1 className={styles.heroTitulo}>Pendientes</h1>
      </header>

      <div className={styles.body}>
        <Pendientes />
      </div>
    </main>
  )
}

export default PendientesPage
