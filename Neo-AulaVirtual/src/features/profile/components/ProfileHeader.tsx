import Avatar from '../../../shared/components/Avatar'
import { currentProfile } from '../../../shared/profile'
import styles from './ProfileHeader.module.css'
import { cutString } from '../../../shared/logic/cutString'

function ProfileHeader() {
  return (
    <section className={styles.profile}>
      <div className={styles.data}>
        <p className={styles.name}>{currentProfile.apellido},<br></br>{cutString(currentProfile.nombre, 24)}</p>
        <p className={styles.mail}>{currentProfile.mail}</p>
        <p className={styles.legajo}>{currentProfile.legajo}</p>
      </div>
      <div className={styles.avatarWrap}>
        <Avatar
          src={currentProfile.foto}
          alt={`Foto de ${currentProfile.nombre}`}
          size={130}
        />
      </div>
    </section>
  )
}

export default ProfileHeader
