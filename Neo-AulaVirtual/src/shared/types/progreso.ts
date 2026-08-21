// Tipos del estado de progreso del alumno sobre su carrera.
// Es la "copia" del plan que vive en localStorage: por cada materia guardamos
// si está aprobada y anotaciones libres. El % de avance se DERIVA de acá
// (nunca se guarda un número suelto como "38").

export interface RegistroMateria {
  /** true = el alumno ya aprobó esta materia */
  aprobada: boolean
  /** notas libres del alumno sobre esta materia */
  anotaciones: string[]
}

export interface ProgresoCarrera {
  /** clave de la carrera en plan_estudios.json (ej. "sistemas") */
  carrera: string
  /** materiaId -> registro de estado */
  materias: Record<string, RegistroMateria>
}
