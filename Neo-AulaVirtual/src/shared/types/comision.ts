export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'

export interface Comision {
  /** id de la materia en el plan de estudios (para el nombre y la ruta). Ej: "IngSoc" */
  "materia": string
  /** código de la comisión anotada. Ej: "K1541" */
  "comision": string
  /** día de la semana de cursada */
  "dia": DiaSemana
  /** rango horario, ej. "14:15 a 17:30" */
  "hora": string
  /** sede, ej. "Sede Campus" */
  "ubicacion": string
  /** año de inicio de cursada, ej. 2026 */
  "inicio": number
}
