import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  /** Porcentaje de avance (0-100) */
  value: number
}

function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label="Progreso del usuario"
    >
      <div className={styles.fill} style={{ width: `${clamped}%` }} />
      <span className={styles.percent}>{clamped}%</span>
    </div>
  )
}

export default ProgressBar
