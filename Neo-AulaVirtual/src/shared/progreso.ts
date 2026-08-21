import { useSyncExternalStore } from 'react'
import { planEstudios } from './plan'
import { currentProfile } from './profile'
import type { Career } from './types/career'
import type { ProgresoCarrera, RegistroMateria } from './types/progreso'

const STORAGE_KEY = 'neo-aula:progreso-carrera'

export interface CarreraActual {
  clave: string
  carrera: Career
}

// La carrera del perfil actual, matcheada contra plan_estudios.json.
// Ojo: currentProfile.carrera es "Sistemas" (legible), pero la clave del JSON es
// "sistemas" (minúscula). Buscamos por clave, version_abreviada o nombre completo.
export function carreraActual(): CarreraActual {
  const buscado = (currentProfile.carrera ?? '').trim().toLowerCase()
  const entradas = Object.entries(planEstudios.carrera)
  const encontrada =
    entradas.find(
      ([clave, c]) =>
        clave.toLowerCase() === buscado ||
        c.version_abreviada.toLowerCase() === buscado ||
        c.nombre_completo.toLowerCase() === buscado,
    ) ?? entradas[0]
  return { clave: encontrada[0], carrera: encontrada[1] }
}

// Estado inicial: una entrada por materia de los niveles, sin aprobar y sin notas.
// (Las electivas quedan fuera por ahora: tienen su propia lógica de créditos.)
export function progresoInicial(clave: string): ProgresoCarrera {
  const carrera = planEstudios.carrera[clave]
  const materias: Record<string, RegistroMateria> = {}
  for (const ids of Object.values(carrera?.nivel ?? {})) {
    for (const id of ids) materias[id] = { aprobada: false, anotaciones: [] }
  }
  return { carrera: clave, materias }
}

function leerStorage(): ProgresoCarrera | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ProgresoCarrera
    if (parsed && typeof parsed === 'object' && parsed.materias) return parsed
    return null
  } catch {
    return null
  }
}

function guardar() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado))
  } catch {
    // localStorage no disponible (p. ej. tests/SSR) → seguimos en memoria.
  }
}

// Singleton: se inicializa una vez por sesión. Si no hay nada guardado (o la
// carrera guardada ya no coincide con la del perfil), arranca desde cero.
let estado: ProgresoCarrera = (() => {
  const guardado = leerStorage()
  if (guardado && guardado.carrera === carreraActual().clave) return guardado
  return progresoInicial(carreraActual().clave)
})()

guardar()

const listeners = new Set<() => void>()

function mutar(fn: (p: ProgresoCarrera) => ProgresoCarrera) {
  estado = fn(estado)
  guardar()
  for (const l of listeners) l()
}

export function toggleAprobada(id: string) {
  mutar((p) => {
    const actual = p.materias[id] ?? { aprobada: false, anotaciones: [] }
    return {
      ...p,
      materias: { ...p.materias, [id]: { ...actual, aprobada: !actual.aprobada } },
    }
  })
}

export function agregarAnotacion(id: string, texto: string) {
  const limpio = texto.trim()
  if (!limpio) return
  mutar((p) => {
    const actual = p.materias[id] ?? { aprobada: false, anotaciones: [] }
    return {
      ...p,
      materias: {
        ...p.materias,
        [id]: { ...actual, anotaciones: [...actual.anotaciones, limpio] },
      },
    }
  })
}

export function quitarAnotacion(id: string, indice: number) {
  mutar((p) => {
    const actual = p.materias[id]
    if (!actual) return p
    return {
      ...p,
      materias: {
        ...p.materias,
        [id]: { ...actual, anotaciones: actual.anotaciones.filter((_, i) => i !== indice) },
      },
    }
  })
}

export function reiniciarProgreso() {
  mutar(() => progresoInicial(carreraActual().clave))
}

// Hook para suscribir cualquier componente al estado (reacciona a cada cambio).
export function useProgreso(): ProgresoCarrera {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange)
      return () => {
        listeners.delete(onChange)
      }
    },
    () => estado,
  )
}
