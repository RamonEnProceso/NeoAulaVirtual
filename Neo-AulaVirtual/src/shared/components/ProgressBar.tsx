import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  /** Porcentaje de avance (0-100) */
  value: number
  /** Color del relleno: ámbar (en curso) o verde (completo). Default: ámbar. */
  tone?: 'amber' | 'green'
}

function ProgressBar({ value, tone = 'amber' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const fillClass = tone === 'green' ? styles.fillGreen : styles.fill

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label="Progreso del usuario"
    >
      <div className={fillClass} style={{ width: `${clamped}%` }} />
      <span className={styles.percent}>{clamped}%</span>
    </div>
  )
}

export default ProgressBar
