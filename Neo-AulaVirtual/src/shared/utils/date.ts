import type { DiaSemana } from "../types/comision"

export const hoy = new Date()
export const manana = new Date()
manana.setDate(hoy.getDate() + 1)


export const DIAS_TAB: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']