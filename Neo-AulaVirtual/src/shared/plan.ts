import planRaw from '../assets/plan_estudios.json'
import type { PlanEstudios } from './types/career'

// plan_estudios.json es un diccionario: { materia: Record<id, Materia>, carrera: ... }
export const planEstudios = planRaw as unknown as PlanEstudios

// Diccionario de materias por id. Ej: materias['AM1'].nombre === 'Análisis Matemático I'
export const materias = planEstudios.materia
