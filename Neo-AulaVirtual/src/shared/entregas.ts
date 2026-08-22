import { useSyncExternalStore } from 'react'
import entregasRaw from '../assets/entregas.json'

export interface Entrega {
  id: string
  titulo: string
  /** id de la materia en el plan de estudios (ej. "AyED"), o null si es global. */
  materia: string | null
  /** Fecha límite en formato ISO 'YYYY-MM-DD'. */
  fecha: string
}

export const entregas = entregasRaw as unknown as Entrega[]

/** Convierte un Date a string ISO 'YYYY-MM-DD' en hora local. */
export function toISODate(fecha: Date): string {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Entregas de un día concreto, en orden. */
export function entregasDelDia(fecha: Date): Entrega[] {
  const iso = toISODate(fecha)
  return entregas.filter((e) => e.fecha === iso)
}

/** Entregas de un mes/año, ordenadas por fecha. `mes` es 0-indexado. */
export function entregasDelMes(mes: number, anio: number): Entrega[] {
  return entregas
    .filter((e) => {
      const [y, m] = e.fecha.split('-').map(Number)
      return y === anio && m === mes + 1
    })
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
}

// ── Estado "entregada" (localStorage, mismo patrón que progreso.ts) ──
const STORAGE_KEY = 'neo-aula:entregadas'

let entregadasSet: Set<string> = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as string[]
    return Array.isArray(parsed) ? new Set(parsed) : new Set()
  } catch {
    return new Set()
  }
})()

function guardarEntregadas() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...entregadasSet]))
  } catch {
    // localStorage no disponible → seguimos en memoria.
  }
}

const listeners = new Set<() => void>()

export function toggleEntregada(id: string) {
  const next = new Set(entregadasSet)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  entregadasSet = next
  guardarEntregadas()
  for (const l of listeners) l()
}

export function esEntregada(id: string): boolean {
  return entregadasSet.has(id)
}

export function useEntregadas(): Set<string> {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange)
      return () => {
        listeners.delete(onChange)
      }
    },
    () => entregadasSet,
  )
}

// ── Estado derivado ─────────────────────────────────────────────────
export type EstadoEntrega = 'entregado' | 'urgente' | 'proximo'

/** Días que faltan desde `hoyISO` hasta `fechaISO` (negativo si ya pasó). */
export function diasRestantes(fechaISO: string, hoyISO: string): number {
  const [fy, fm, fd] = fechaISO.split('-').map(Number)
  const [hy, hm, hd] = hoyISO.split('-').map(Number)
  const a = new Date(fy, fm - 1, fd).getTime()
  const b = new Date(hy, hm - 1, hd).getTime()
  return Math.round((a - b) / 86400000)
}

/** Menos de esto se considera "falta poco" (urgente); más, "falta una semana o más". */
const UMBRAL_URGENTE_DIAS = 7

export function estadoEntrega(entregada: boolean, dias: number): EstadoEntrega {
  if (entregada) return 'entregado'
  return dias < UMBRAL_URGENTE_DIAS ? 'urgente' : 'proximo'
}

/** Entregas visibles: oculta las NO entregadas cuya fecha ya pasó (se "eliminan"). */
export function entregasActivas(entregadas: Set<string>, hoyISO: string): Entrega[] {
  return entregas
    .filter((e) => entregadas.has(e.id) || e.fecha >= hoyISO)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
}

/** Entregas activas de una materia (id del plan). */
export function entregasDeMateria(
  materiaId: string,
  entregadas: Set<string>,
  hoyISO: string,
): Entrega[] {
  return entregasActivas(entregadas, hoyISO).filter((e) => e.materia === materiaId)
}

/** Entregas activas que todavía NO se entregaron (las "pendientes" de verdad). */
export function pendientesActivas(entregadas: Set<string>, hoyISO: string): Entrega[] {
  return entregasActivas(entregadas, hoyISO).filter((e) => !entregadas.has(e.id))
}
