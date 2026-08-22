import {
  diasRestantes,
  entregasActivas,
  entregasDeMateria,
  estadoEntrega,
  toISODate,
  toggleEntregada,
  useEntregadas,
} from '../entregas'
import styles from './Pendientes.module.css'

const MESES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatoCorto(fechaISO: string): string {
  const [, m, d] = fechaISO.split('-').map(Number)
  return `${d} ${MESES_CORTO[m - 1]}`
}

interface PendientesProps {
  /** Opcional: filtra solo las entregas de esta materia (id del plan). */
  materiaId?: string
  /** Opcional: máx. de entregas a mostrar (para vistas compactas tipo Home). */
  limit?: number
}

function Pendientes({ materiaId, limit }: PendientesProps) {
  const entregadas = useEntregadas()
  const hoyISO = toISODate(new Date())
  const lista = materiaId
    ? entregasDeMateria(materiaId, entregadas, hoyISO)
    : entregasActivas(entregadas, hoyISO)
  const visibles = limit ? lista.slice(0, limit) : lista

  if (lista.length === 0) {
    return <p className={styles.vacio}>No tenés entregas pendientes</p>
  }

  return (
    <ul className={styles.lista}>
      {visibles.map((e) => {
        const entregada = entregadas.has(e.id)
        const dias = diasRestantes(e.fecha, hoyISO)
        const estado = estadoEntrega(entregada, dias)

        return (
          <li key={e.id}>
            <button
              type="button"
              className={`${styles.card} ${styles[estado]}`}
              onClick={() => toggleEntregada(e.id)}
              aria-pressed={entregada}
              title={entregada ? 'Marcar como no entregada' : 'Marcar como entregada'}
            >
              <div className={styles.cuerpo}>
                <span className={styles.titulo}>{e.titulo}</span>
                <span className={styles.chip}>{formatoCorto(e.fecha)}</span>
              </div>
              <div className={styles.badge} aria-hidden="true">
                {entregada ? (
                  <span className={styles.check}>✓</span>
                ) : (
                  <>
                    <span className={styles.numero}>{dias}</span>
                    <span className={styles.etiqueta}>
                      {dias === 1 ? 'día' : dias === 0 ? 'hoy' : 'días'}
                    </span>
                  </>
                )}
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Pendientes
