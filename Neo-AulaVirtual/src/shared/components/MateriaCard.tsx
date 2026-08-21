import { Link } from 'react-router-dom'
import { materias } from '../plan'
import type { Comision } from '../types/comision'
import styles from './MateriaCard.module.css'

interface MateriaCardProps {
  comision: Comision
}

function MateriaCard({ comision }: MateriaCardProps) {
  // La comisión referencia a su materia del plan por id → nombre + ruta.
  const materia = materias[comision.materia]
  if (!materia) return null

  return (
    <Link to={`/materia/${materia.id}`} className={styles.card}>
      <div className={styles.cabecera}>
        <span className={styles.horario}>
         {comision.hora}
        </span>
        <span className={styles.comision}>{comision.comision}</span>
      </div>
      <div className={styles.pie}>
        <span className={styles.nombre}>{materia.nombre}</span>
        <span className={styles.ubicacion}>{comision.ubicacion}</span>
      </div>
    </Link>
  )
}

export default MateriaCard
