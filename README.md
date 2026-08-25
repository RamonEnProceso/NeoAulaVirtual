# <img align="center" src="./docs/assets/icons/UTN_FBRA_icon.webp" alt="UTN FRBA Icon" height="50px" width="50px"/> Neo Aula Virtual

> #### **Neo Aula Virtual - CONAIISI 2026**
> Entorno integrado para la gestión y visualización académica: unifica la información del SIU-GUARANÍ y el Aula Virtual en una interfaz mobile-first, con seguimiento visual del avance del plan de estudios.

>*Supervisado por Ing. Ariel Eduardo García*

[![UTN](https://img.shields.io/badge/UTN--FRBA-E63946?style=flat-square&for-the-badge)](https://www.frba.utn.edu.ar/) [![CONAIISI](https://img.shields.io/badge/CONAIISI%202026-003050?style=flat-square&for-the-badge)](https://conaiisi2026.frre.utn.edu.ar/) ![Estado](https://img.shields.io/badge/Estado-Paper%20entregado-2ea44f?style=flat-square) ![Design](https://img.shields.io/badge/Design-Mobile%20First-3DDC84?style=flat-square&logo=android&logoColor=3DDC84) ![TypeScript](https://img.shields.io/badge/TypeScript-1976d2?style=flat-square&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-42a5f5?logo=react&logoColor=white&style=flat-square)

---

## Estado del proyecto

- ✅ **Paper entregado al CONAIISI 2026** (24/08/2026) — [ver PDF](./docs/pdfs/Neo%20Aula%20Virtual%20-%20Paper.pdf)
- 🚀 **App en producción** — [neo-aula-virtual.web.app](https://neo-aula-virtual.web.app)
- 📱 **APK para Android** — (No compartida para el público)
- 📊 **Encuesta a estudiantes (n=26)**: el 88% usaría la aplicación — [resultados](./docs/05-encuesta.md)

<div align="center">
<img src="./docs/assets/screenshots/inicio.webp" width="600" alt="Captura - Pantalla de inicio" align="center"/>
</div>

## Objetivo

El Aula Virtual y el SIU-GUARANÍ resuelven la gestión académica de la cursada, pero la información del estudiante vive **fragmentada entre dos sistemas**: la agenda y el legajo en uno, los materiales en el otro, y el plan de estudios sin integrarse con los horarios ni el progreso real del estudiante.

**Neo Aula Virtual** centraliza esa información en un **único entorno mobile-first**:
- Plan de estudios con sus correlatividades
- Avance real de la carrera
- Peso académico conforme al reglamento actual
- Agenda de comisiones
- Calendario de entregas
- Pendientes con niveles de urgencia
- Horarios en una sola interfaz

## Stack

### Frontend
>**React 19 + TypeScript + Vite, mobile-first**
<table align="center">
  <tr>
    <td align="center">
      <img src="./docs/assets/icons/React_logo.webp" height="35px" width="40px" alt="React"/>
      <br/>React
    </td>
    <td align="center">
      <img src="./docs/assets/icons/Typescript_logo.webp" height="35px" width="35px" alt="Typescript"/>
      <br/>TypeScript
    </td>
    <td align="center">
      <img src="./docs/assets/icons/CSS_logo.webp" height="35px" width="35px" alt="Css Modules"/>
      <br/>CSS Modules
    </td>
  </tr>
</table>

### Despliegue
- **Firebase Hosting** — producción en [neo-aula-virtual.web.app](https://neo-aula-virtual.web.app)
- **Capacitor** — empaquetado como APK instalable para Android
- **localStorage** — persistencia local del progreso del alumno (Solo en la fase beta)

### Futuro — Integración de IA
>**Asistente académico - en planificación**
<table align="center">
  <tr>
    <td align="center">
      <img src="./docs/assets/icons/Python_logo.webp" height="35px" width="35px" alt="Python"/>
      <br/>Python
    </td>
    <td align="center">
      <img src="./docs/assets/icons/fastapi_logo.webp" height="35px" width="35px" alt="FastApi"/>
      <br/>FastApi
    </td>
    <td align="center">
      <img src="./docs/assets/icons/Ollama_logo.webp" height="35px" width="35px" alt="Ollama"/>
      <br/>Ollama
    </td>
  </tr>
</table>

## Documentación

Ver el [índice](./docs/00-indice.md) de la documentación: problema, propuesta, roadmap, decisiones técnicas y resultados de la encuesta.

- [Problema](./docs/01-problema.md) · [Propuesta](./docs/02-propuesta.md) · [Roadmap](./docs/03-roadmap.md) · [Decisiones](./docs/04-decisiones.md) · [Encuesta](./docs/05-encuesta.md)
- 📄 [Paper CONAIISI 2026 (PDF)](./docs/pdfs/Neo%20Aula%20Virtual%20-%20Paper.pdf)

## Estructura del repositorio

| Carpeta | Rol |
|---|---|
| `Neo-AulaVirtual/` | Código Frontend de la aplicación |
| `docs/` | Documentación del proyecto y paper |

---

<div align="center">

**Ramón Ramírez - 2026**
</div>
