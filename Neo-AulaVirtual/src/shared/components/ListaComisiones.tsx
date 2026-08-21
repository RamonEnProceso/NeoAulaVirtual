import MateriaCard from './MateriaCard'
import type { Comision } from '../types/comision'
import styles from './ListaComisiones.module.css'

interface ListaComisionesProps {
  comisiones: Comision[]
  /** true → fila con scroll horizontal (Hoy / Mañana). false (default) → grilla de 2 columnas. */
  horizontal?: boolean
}

function ListaComisiones({ comisiones, horizontal = false }: ListaComisionesProps) {
  if (comisiones.length === 0) {
    return <p className={styles.vacio}>No tenés clases este día</p>
  }

  const claseLista = horizontal ? styles.scroll : styles.grid
  const claseItem = horizontal ? styles.scrollItem : styles.celda

  return (
    <ul className={claseLista}>
      {comisiones.map((c) => (
        <li key={`${c.materia}-${c.comision}`} className={claseItem}>
          <MateriaCard comision={c} />
        </li>
      ))}
    </ul>
  )
}

export default ListaComisiones
