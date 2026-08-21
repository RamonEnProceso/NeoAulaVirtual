import comisionesRaw from '../assets/comisiones.json'
import type { Comision, DiaSemana } from './types/comision'

// Comisiones anotadas del alumno: cada una referencia una materia del plan
// (campo `materia`) y tiene su propio código de comisión (`comision`).
export const comisiones = comisionesRaw as unknown as Comision[]

export const ORDEN_DIAS: DiaSemana[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']

export const NOMBRE_DIA: Record<DiaSemana, string> = {
  domingo: 'Domingo',
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
}

export const ABREV_DIA: Record<DiaSemana, string> = {
  domingo: 'Dom',
  lunes: 'Lun',
  martes: 'Mar',
  miercoles: 'Mié',
  jueves: 'Jue',
  viernes: 'Vie',
  sabado: 'Sáb',
}
