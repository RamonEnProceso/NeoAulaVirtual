# Propuesta

## Núcleo — Rediseño de interfaz
Reconstrucción mobile-first de la plataforma, priorizando la experiencia del estudiante sobre la administración institucional.

- **Interfaz responsive** adaptada a móvil y escritorio.
- **Modo oscuro**.
- **Legajo visible** en el perfil del alumno.
- Apartado de **tareas próximas** visible por defecto, ordenado por fecha de entrega.
- **Indicador de semana actual** dentro del año académico.
  Ej: "Semana 23 de 52 — faltan 3 semanas para el parcial"

## Progreso académico
Features orientadas a que el estudiante tenga conciencia
real de su situación en la carrera y en cada materia.

- **Agenda personal por materia** — cada materia permite cargar horarios propios para que la interfaz se adapte al día del estudiante.
- **Seguidor de carrera** — vista del progreso e hitos académicos acumulados a lo largo de la carrera.
- **Burndown chart adaptado** — herramienta inspirada en SCRUM que muestra qué tan al día está el alumno con las entregas de cada materia. Los datos se calculan a partir del tiempo promedio de respuesta desde que se anuncia cada tarea, o se cargan manualmente por el profesor.
- **OKR académico** — sistema para que el alumno defina objetivos medibles alineados a su carrera y haga seguimiento de su progreso.

## Gamificación
Mecanismos de reconocimiento y motivación distribuidos en la interfaz.

- **Feeling visual** — microinteracciones contextuales: confeti al aprobar un TP, contador regresivo en rojo cuando una entrega está próxima a vencer.
- **Sistema de logros** — hitos visibles en el perfil del alumno que reconocen participación académica y extracurricular.
  Ej: Mejor promedio en Física I (2026), Ganador del
  Torneo de Fútbol (2023), Mejor compañero en foros (2024)

## IA — Trabajo futuro
Asistente cognitivo integrado al aula, entrenado con material de cada cátedra. A diferencia de herramientas como NotebookLM, el asistente fomentaría la lectura del material original en lugar de reemplazarla.
- Límite de interacciones diarias (2-3 cada 24hs),
  ampliable mediante puntos obtenidos en actividades
  académicas.
- Requiere backend con FastAPI + Ollama.