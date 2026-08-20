import { useEffect, useRef, useState } from 'react'
import { currentProfile } from '../../../shared/profile'
import { TERMINOS_PESO, POLINOMIO_ORIGINAL, tonoValor } from '../logic/calcPesoAcademico'
import type { Tone } from '../logic/calcPesoAcademico'
import styles from './PesoPolinomio.module.css'

const CHIP: Record<Tone, string> = {
  red: styles.chipRed,
  amber: styles.chipAmber,
  green: styles.chipGreen,
  gray: styles.chipGray,
}

function PesoPolinomioCard() {
  const { pesoAcademico } = currentProfile
  const [visible, setVisible] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function mostrar() {
    setVisible(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVisible(false), 5000)
  }

  return (
    <>
      <button type="button" className={styles.card} onClick={mostrar}>
        <span className={styles.ecuacion}>
          <span className={styles.prefix}>P = </span>
          {TERMINOS_PESO.map((t, i) => {
            const valor = pesoAcademico[t.key]
            const tono = tonoValor(t.tono, valor)
            return (
              <span key={t.key} className={styles.termino}>
                <span className={styles.signo}>
                  {i === 0 ? ' ' : t.signo === '+' ? ' + ' : ' - '}
                </span>
                <span>( {t.coef} × </span>
                <span className={`${styles.chip} ${CHIP[tono]}`}>{valor}</span>
                <span> )</span>
              </span>
            )
          })}
        </span>
        <span className={styles.hint}>Tocá para ver el polinomio original</span>
      </button>

      {visible && (
        <div className={styles.toast} role="status">
          <div className={styles.toastHeader}>
            <span className={styles.toastTitulo}>Polinomio original</span>
            <button
              type="button"
              className={styles.cerrar}
              onClick={() => setVisible(false)}
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
          <p className={styles.toastTexto}>{POLINOMIO_ORIGINAL}</p>
        </div>
      )}
    </>
  )
}

export default PesoPolinomioCard
