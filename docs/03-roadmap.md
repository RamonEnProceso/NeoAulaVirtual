# Roadmap

> Estado actualizado al **20/08/2026**

## Fase 1 — Investigación y diseño

- [x] Definir pantallas principales a prototipar
- [ ] Diseño en Figma — mobile first
  - [x] Vista de materia
  - [x] Seguidor de carrera
  - [ ] Pantalla principal (menú de inicio)
  - [ ] Perfil del alumno

## Fase 2 — Prototipo funcional

- [x] Setup del proyecto React + TypeScript
  - Vite + React 19, react-router-dom, estructura feature-based (`src/features/*`)
- [ ] Definir estructura de datos mockeados
  - [ ] `assets/plan_estudios.json`: seguidor de carreras.
  - [ ] Materias, archivos, profesores, etc.
- [ ] Implementar pantallas del núcleo
  > Estructura de archivos creada (`src/features/*/pages`) — la UI real está pendiente.
  - [ ] Login
  - [ ] Pantalla principal — entregables próximos, exámenes/finales, feriados
  - [ ] Vista de materia — unidades, actividades, bibliografía, material (PDFs) categorizado
  - [ ] Tareas próximas
- [ ] Implementar progreso académico
  - [ ] Seguidor de carrera — estado por materia (aprobada / firmada / sin aprobar), calificaciones, días de clase y aula
  - [ ] Burndown chart adaptado
  - [ ] Agenda personal por materia
- [ ] Implementar gamificación
  - [ ] Feeling visual — confeti al aprobar, contadores regresivos en entregas próximas
  - [ ] Sistema de logros

## Fuera del camino crítico

> Herramientas complementarias: no atacan las fricciones del Aula Virtual, por lo que se implementan solo si el núcleo está completo.

- [ ] Pomodoro — temporizador de estudio integrado
- [ ] Conversor de bases numéricas — apoyo para Algoritmos y Arquitectura de Computadoras

## Fase 3 — Paper

- [ ] Introducción y problema
- [ ] Marco teórico
- [ ] Propuesta y justificación
- [ ] Capturas y evidencia del prototipo
- [ ] Conclusiones
- [ ] Revisión con el profesor

## Fase 4 — Futuro

- [ ] UTN AI — asistente con backend FastAPI + Ollama
