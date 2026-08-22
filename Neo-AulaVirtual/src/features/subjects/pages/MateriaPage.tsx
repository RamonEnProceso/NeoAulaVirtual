import { useParams } from 'react-router-dom'
import { materias } from '../../../shared/plan'
import Pendientes from '../../../shared/components/Pendientes'
import styles from './MateriaPage.module.css'

function MateriaPage() {
  const { id } = useParams()
  const materia = id ? materias[id] : undefined

  return (
    <main className={styles.page}>
      {materia ? (
        <>
          <h1 className={styles.titulo}>{materia.nombre}</h1>
          <p className={styles.codigo}>
            {materia.id} · {materia.tipo}
          </p>
        </>
      ) : (
        <h1 className={styles.titulo}>Materia no encontrada</h1>
      )}

      {materia && (
        <section className={styles.seccion}>
          <h2 className={styles.seccionTitulo}>Pendientes</h2>
          <Pendientes materiaId={materia.id} />
        </section>
      )}
    </main>
  )
}

export default MateriaPage
