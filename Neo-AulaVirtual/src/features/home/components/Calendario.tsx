import { useState } from 'react'
import { entregasDelMes, toISODate } from '../../../shared/entregas'
import styles from './Calendario.module.css'

const DIAS_SEMANA = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

interface CalendarioProps {
  /** Día seleccionado por el usuario, o null si no hay ninguno. */
  seleccion: Date | null
  onSelect: (fecha: Date) => void
}

function Calendario({ seleccion, onSelect }: CalendarioProps) {
  const [vista, setVista] = useState(() => {
    const ahora = new Date()
    return { anio: ahora.getFullYear(), mes: ahora.getMonth() }
  })

  const primerDia = new Date(vista.anio, vista.mes, 1)
  // Offset para que la semana arranque en lunes (lunes = 0, domingo = 6).
  const offset = (primerDia.getDay() + 6) % 7
  const diasEnMes = new Date(vista.anio, vista.mes + 1, 0).getDate()

  const diasConEntrega = new Set(entregasDelMes(vista.mes, vista.anio).map((e) => e.fecha))

  const celdas: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: diasEnMes }, (_, i) => new Date(vista.anio, vista.mes, i + 1)),
  ]

  const tituloMes = primerDia.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
  const tituloMesCapitalizado = tituloMes.charAt(0).toUpperCase() + tituloMes.slice(1)

  const hoyISO = toISODate(new Date())
  const seleccionISO = seleccion ? toISODate(seleccion) : null

  const cambiarMes = (delta: number) => {
    setVista((v) => {
      const nuevo = new Date(v.anio, v.mes + delta, 1)
      return { anio: nuevo.getFullYear(), mes: nuevo.getMonth() }
    })
  }

  return (
    <div className={styles.calendario}>
      <div className={styles.cabecera}>
        <button type="button" className={styles.flecha} onClick={() => cambiarMes(-1)} aria-label="Mes anterior">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className={styles.mesTitulo}>{tituloMesCapitalizado}</span>
        <button type="button" className={styles.flecha} onClick={() => cambiarMes(1)} aria-label="Mes siguiente">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.filaDias}>
        {DIAS_SEMANA.map((d) => (
          <span key={d} className={styles.diaNombre} aria-hidden="true">
            {d}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {celdas.map((fecha, i) => {
          if (!fecha) return <div key={`vacio-${i}`} className={styles.celdaVacia} aria-hidden="true" />
          const iso = toISODate(fecha)
          const esHoy = iso === hoyISO
          const esSeleccion = iso === seleccionISO
          const tieneEntrega = diasConEntrega.has(iso)
          const clases = [styles.dia, esHoy ? styles.hoy : '', esSeleccion ? styles.seleccionado : '']
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={iso}
              type="button"
              className={clases}
              onClick={() => onSelect(fecha)}
              aria-pressed={esSeleccion}
              aria-label={fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
            >
              <span className={styles.diaNumero}>{fecha.getDate()}</span>
              <span className={styles.punto} data-entrega={tieneEntrega || undefined} aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendario
