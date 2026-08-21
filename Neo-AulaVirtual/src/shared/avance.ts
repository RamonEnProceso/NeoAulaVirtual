import { materias } from './plan'
import type { Career } from './types/career'
import type { ProgresoCarrera } from './types/progreso'

// Lógica pura del avance: dado el plan + el estado de progreso, deriva el nivel
// actual, qué materias están accesibles y los porcentajes. Sin efectos, sin UI.

// Los 4 estados de acceso a una materia en el visualizador.
export type Acceso = 'aprobada' | 'cursando' | 'habilitada' | 'bloqueada'

export function nivelesDe(carrera: Career): number[] {
  return Object.keys(carrera.nivel).map(Number).sort((a, b) => a - b)
}

// Nivel actual = el primer nivel (más bajo) que tiene alguna materia sin aprobar.
export function nivelActual(carrera: Career, progreso: ProgresoCarrera): number {
  const niveles = nivelesDe(carrera)
  for (const n of niveles) {
    const ids = carrera.nivel[String(n)]
    if (ids.some((id) => !progreso.materias[id]?.aprobada)) return n
  }
  return niveles[niveles.length - 1] ?? 1
}

// Correlativas que todavía no tiene aprobadas. Para poder cursar una materia
// se necesitan tanto las de "aprobar" como las de "regularizar" (en este modelo
// ambas se satisfacen con el boolean "aprobada"), así que las unimos.
export function correlativasFaltantes(id: string, progreso: ProgresoCarrera): string[] {
  const m = materias[id]
  if (!m) return []
  const requeridas = [...m.requisitos.aprobar, ...m.requisitos.regularizar]
  return requeridas.filter((cid) => !progreso.materias[cid]?.aprobada)
}

export function accesoMateria(
  id: string,
  nivel: number,
  carrera: Career,
  progreso: ProgresoCarrera,
): Acceso {
  if (progreso.materias[id]?.aprobada) return 'aprobada'
  if (nivel === nivelActual(carrera, progreso)) return 'cursando'
  if (correlativasFaltantes(id, progreso).length === 0) return 'habilitada'
  return 'bloqueada'
}

// Estado global de un NIVEL (para colorear su card en /avance):
// - completado   = todas sus materias aprobadas (verde)
// - cursando     = es el nivel actual (ámbar)
// - habilitado   = tiene materias habilitadas, pero aún no es su turno (rosado)
// - noHabilitado = sin materias habilitadas (gris, apagado)
export type EstadoNivel = 'completado' | 'cursando' | 'habilitado' | 'noHabilitado'

export function estadoNivel(
  nivel: number,
  carrera: Career,
  progreso: ProgresoCarrera,
): EstadoNivel {
  const ids = carrera.nivel[String(nivel)]
  if (ids.every((id) => progreso.materias[id]?.aprobada)) return 'completado'
  const actual = nivelActual(carrera, progreso)
  if (nivel === actual) return 'cursando'
  const habilitadas = ids.filter((id) => accesoMateria(id, nivel, carrera, progreso) !== 'bloqueada').length
  return habilitadas > 0 ? 'habilitado' : 'noHabilitado'
}

export interface ResumenNivel {
  nivel: number
  total: number
  aprobadas: number
  habilitadas: number
  porcentaje: number
}

export interface ResumenAvance {
  aprobadas: number
  total: number
  porcentaje: number
  porNivel: ResumenNivel[]
}

export function calcAvance(carrera: Career, progreso: ProgresoCarrera): ResumenAvance {
  let aprobadas = 0
  let total = 0
  const porNivel: ResumenNivel[] = nivelesDe(carrera).map((n) => {
    const ids = carrera.nivel[String(n)]
    const aprob = ids.filter((id) => progreso.materias[id]?.aprobada).length
    const hab = ids.filter((id) => accesoMateria(id, n, carrera, progreso) !== 'bloqueada').length
    aprobadas += aprob
    total += ids.length
    return {
      nivel: n,
      total: ids.length,
      aprobadas: aprob,
      habilitadas: hab,
      porcentaje: ids.length ? Math.round((aprob / ids.length) * 100) : 0,
    }
  })
  return {
    aprobadas,
    total,
    porcentaje: total ? Math.round((aprobadas / total) * 100) : 0,
    porNivel,
  }
}
