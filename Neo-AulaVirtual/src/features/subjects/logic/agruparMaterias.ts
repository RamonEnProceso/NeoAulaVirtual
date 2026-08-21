import type { Comision } from '../../../shared/types/comision'

export interface GrupoPorAnio {
  anio: number
  comisiones: Comision[]
}

/**
 * Agrupa las comisiones por su año de inicio (`inicio`) y las ordena
 * del año más reciente al más antiguo.
 */
export function agruparPorInicio(comisiones: Comision[]): GrupoPorAnio[] {
  const porAnio = new Map<number, Comision[]>()

  for (const c of comisiones) {
    const lista = porAnio.get(c.inicio)
    if (lista) lista.push(c)
    else porAnio.set(c.inicio, [c])
  }

  return [...porAnio.entries()]
    .sort(([a], [b]) => b - a)
    .map(([anio, comisiones]) => ({ anio, comisiones }))
}
