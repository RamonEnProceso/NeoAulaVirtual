export type MateriaTipo = 'dedicada' | 'homogénea' | 'electiva'

export interface MateriaRequisitos {
  regularizar: string[]
  aprobar: string[]
}

export interface Materia {
  id: string
  nombre: string
  requisitos: MateriaRequisitos
  tipo: MateriaTipo
}

export interface Electiva {
  id: string
  nombre: string
  niveles: number[]
}

export interface Career {
  nombre_completo: string
  version_abreviada: string
  letra: string
  nivel: Record<string, string[]>
  cantidad: number
  electivas: {
    nota: string
    materias: Electiva[]
  }
}

export interface PlanEstudios {
  materia: Record<string, Materia>
  carrera: Record<string, Career>
}
