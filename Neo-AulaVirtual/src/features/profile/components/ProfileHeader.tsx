import Avatar from '../../../shared/components/Avatar'
import CopyButton from '../../../shared/components/CopyButton'
import { currentProfile } from '../../../shared/profile'
import styles from './ProfileHeader.module.css'
import { cutString } from '../../../shared/utils/cutString'

function ProfileHeader() {
  return (
    <section className={styles.profile}>
      <div className={styles.data}>
        <p className={styles.name}>{currentProfile.apellido},<br></br>{cutString(currentProfile.nombre, 24)}</p>
        <div className={styles.field}>
          <p className={styles.mail}>{currentProfile.mail}</p>
          <CopyButton text={currentProfile.mail} label="Copiar mail" />
        </div>
        <div className={styles.field}>
          <p className={styles.legajo}>{currentProfile.legajo}</p>
          <CopyButton text={currentProfile.legajo} label="Copiar legajo" />
        </div>
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
