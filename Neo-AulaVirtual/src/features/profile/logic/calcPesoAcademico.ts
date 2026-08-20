import type { Profile } from "../../../shared/types/profile.ts";

export type ScoreTone = 'red' | 'amber' | 'green'
export type Tone = ScoreTone | 'gray'

export interface TerminoPeso {
  signo: '+' | '-'
  coef: number
  key: keyof Profile['pesoAcademico']
  nombre: string
  tono: ScoreTone
}

// Fuente única de verdad del polinomio de peso académico.
export const TERMINOS_PESO: TerminoPeso[] = [
  { signo: '+', coef: 11, key: 'map_total', nombre: 'MAp_total', tono: 'green' },
  { signo: '-', coef: 7, key: 'fad_total', nombre: 'FAd_total', tono: 'red' },
  { signo: '-', coef: 19, key: 'fau_ciclo', nombre: 'FAu_ciclo', tono: 'red' },
  { signo: '-', coef: 17, key: 'mab_ciclo', nombre: 'MAb_ciclo', tono: 'red' },
  { signo: '+', coef: 5, key: 'mr_ciclo', nombre: 'MR_ciclo', tono: 'amber' },
]

// Polinomio "original" (sin valores), para la notificación.
export const POLINOMIO_ORIGINAL = `P = ${TERMINOS_PESO.map((t, i) =>
  `${i === 0 ? '' : t.signo === '+' ? ' + ' : ' - '} ( ${t.coef} × ${t.nombre})`,
).join('')}`

export const calcPesoAcademico = (profile: Profile): number =>
  TERMINOS_PESO.reduce(
    (total, { signo, coef, key }) =>
      total + (signo === '+' ? 1 : -1) * coef * profile.pesoAcademico[key],
    0,
  )

export const tonoPesoAcademico = (score: number): ScoreTone =>
  score < 0 ? 'red' : score < 50 ? 'amber' : 'green'

export const estadoPesoAcademico = (score: number): string =>
  ({ red: 'En riesgo', amber: 'Atención', green: 'Saludable' })[tonoPesoAcademico(score)]

// Un valor en 0 no tiene estado que reportar → se muestra gris.
export const tonoValor = (tono: ScoreTone, valor: number): Tone =>
  valor === 0 ? 'gray' : tono
