import { comisiones } from '../../../shared/comisiones'
import { agruparPorInicio } from '../logic/agruparMaterias'
import ListaComisiones from '../../../shared/components/ListaComisiones'
import styles from './SubjectsPage.module.css'

function SubjectsPage() {
  const grupos = agruparPorInicio(comisiones)

  return (
    <main className={styles.page}>
      <h1 className={styles.titulo}>Materias</h1>

      {grupos.map(({ anio, comisiones: deAnio }) => (
        <section key={anio} className={styles.seccion}>
          <h2 className={styles.anio}>{anio}</h2>
          <ListaComisiones comisiones={deAnio} />
        </section>
      ))}
    </main>
  )
}

export default SubjectsPage
