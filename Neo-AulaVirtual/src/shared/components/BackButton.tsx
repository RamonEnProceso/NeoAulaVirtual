import styles from './BackButton.module.css'

interface BackButtonProps {
  onClick: () => void
  /** Texto accesible del botón. */
  label?: string
}

// Botón circular "volver" reutilizable en cualquier pantalla.
function BackButton({ onClick, label = 'Volver' }: BackButtonProps) {
  return (
    <button type="button" className={styles.btn} onClick={onClick} aria-label={label}>
      ←
    </button>
  )
}

export default BackButton
