import ProfileHeader from '../components/ProfileHeader'
import ProgressCard from '../components/ProgressCard'
import styles from './ProfilePage.module.css'
import PesoAcademicoCard from '../components/PesoAcademico'
import AgendaCard from '../../../shared/components/AgendaCard'

function ProfilePage() {
  return (
    <main className={styles.page}>
      <ProfileHeader />
      <div className={styles.body}>
        <section className={styles.section}>
          <h2 className={styles.titulo}>Carrera</h2>
          <ProgressCard />
        </section>
        <section className={styles.section}>
          <PesoAcademicoCard />
        </section>
        <section className={styles.section}>
          <AgendaCard />
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
