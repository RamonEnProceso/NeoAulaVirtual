import type { Profile } from "../../../shared/types/profile.ts";

export const calcPesoAcademico = (profile : Profile) =>{
    const pesoAcademico = profile.pesoAcademico;
    return (11* pesoAcademico.map_total)-(7* pesoAcademico.fad_total)-(19*pesoAcademico.fau_ciclo)-(17*pesoAcademico.mab_ciclo)+(5*pesoAcademico.mr_ciclo);
}