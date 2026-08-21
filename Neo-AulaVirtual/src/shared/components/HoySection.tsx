import { NOMBRE_DIA } from '../comisiones'
import { deHoy, diaHoy } from '../selectMaterias'
import { hoy } from '../utils/date'
import ListaComisiones from './ListaComisiones'
import styles from './HoySection.module.css'

// Sección reutilizable "Hoy": carga sola las materias del día actual.
function HoySection() {
  return (
    <section className={styles.seccion}>
      <h2 className={styles.seccionTitulo}>
        Hoy
        <span className={styles.seccionFecha}>
          {NOMBRE_DIA[diaHoy]} · {hoy.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}
        </span>
      </h2>
      <ListaComisiones comisiones={deHoy} horizontal />
    </section>
  )
}

export default HoySection
