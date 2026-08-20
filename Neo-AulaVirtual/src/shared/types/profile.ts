export interface Profile {
    "foto":string
    "nombre": string
    "apellido":string
    "carrera"?: string
    "legajo": string
    "mail": string
    "avance": number
    "pesoAcademico": PesoAcademico
}

interface PesoAcademico {
    "map_total":number
    "fad_total":number
    "fau_ciclo":number
    "mab_ciclo":number
    "mr_ciclo":number
}