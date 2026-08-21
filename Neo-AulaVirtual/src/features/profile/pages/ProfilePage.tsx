import ProfileHeader from '../components/ProfileHeader'
import ProgressCard from '../components/ProgressCard'
import styles from './ProfilePage.module.css'
import PesoAcademicoCard from '../components/PesoAcademico'
import HorarioCard from '../../../shared/components/HorarioCard'

function ProfilePage() {
  return (
    <main className={styles.page}>
      <ProfileHeader />
      <div className={styles.body}>
        <section className={styles.section}>
          <h2 className={styles.titulo}>Agenda</h2>
          <HorarioCard />
        </section>
        <section className={styles.section}>
          <h2 className={styles.titulo}>Carrera</h2>
          <ProgressCard />
        </section>
        <section className={styles.section}>
          <PesoAcademicoCard />
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
