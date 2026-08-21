import { comisiones, ORDEN_DIAS } from './comisiones'
import { hoy, manana } from './utils/date'

export const diaHoy = ORDEN_DIAS[hoy.getDay()]
export const diaManana = ORDEN_DIAS[manana.getDay()]

export const deHoy = comisiones.filter((c) => c.dia === diaHoy)
export const deManana = comisiones.filter((c) => c.dia === diaManana)
