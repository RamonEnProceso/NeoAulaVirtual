import styles from './Avatar.module.css'

interface AvatarProps {
  src: string
  alt?: string
  size?: number
}

function Avatar({ src, alt = 'Foto de perfil', size = 24 }: AvatarProps) {
  return (
    <img
      className={styles.avatar}
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
    />
  )
}

export default Avatar
