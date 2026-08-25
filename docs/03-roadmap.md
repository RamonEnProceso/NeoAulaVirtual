# Roadmap

> Estado actualizado al **24/08/2026**

## Fase 1 — Investigación y diseño 

- [x] Definir pantallas principales a prototipar
- [x] Diseño en Figma — mobile first (vistas de materia, seguidor de carrera, inicio, perfil)
- [x] Encuesta a estudiantes (n=26) — [resultados](./05-encuesta.md)

## Fase 2 — Prototipo funcional → producción

- [x] Setup del proyecto React + TypeScript + Vite, estructura feature-based (`src/features/*`)
- [x] Modelado del plan de estudios con correlatividades (`Neo-AulaVirtual/src/assets/plan_estudios.json`)
- [x] Pantallas del núcleo: inicio, materias, horarios, avance, perfil y notificaciones
- [x] Seguidor de carrera "Tu Avance" y cálculo de peso académico
- [x] Pendientes con niveles de urgencia (semáforo + contadores) y calendario de entregas
- [x] Validación con casos de prueba sobre datos reales del plan (escenarios de correlatividad)
- [x] Despliegue en producción mediante Firebase Hosting
- [x] Empaquetado como APK (Capacitor) para Android

## Fase 3 — Paper CONAIISI 2026

- [x] Introducción, problema y propuesta
- [x] Arquitectura y modelado del sistema
- [x] Resultados de la encuesta
- [x] Conclusiones y trabajos futuros
- [x] Revisión con el profesor
- [x] Entrega (24/08/2026) — [PDF](./pdfs/Neo%20Aula%20Virtual%20-%20Paper.pdf)

## Hitos de la competencia

- [x] Entrega del trabajo — **28/08/2026** (enviado el 24/08)
- [ ] Notificación de aceptación — **29/09/2026**
- [ ] Camera-ready — **12/10/2026**
- [ ] Congreso — **12-13/11/2026**, Resistencia (FRRE)

## Fase 4 — Futuro

> Líneas definidas en el paper; se abordan después del congreso.

- [ ] Sincronización y respaldo en la nube (arquitectura de microservicios)
- [ ] Integración con los sistemas institucionales (comisiones, calificaciones, legajo)
- [ ] Generalización a otras sedes/regionales
- [ ] Contenido de cursada integrado en la interfaz
- [ ] Mapa interactivo de aulas
- [ ] Herramientas de productividad (temporizador de estudio, conversor de bases)
- [ ] Sistema de logros y gamificación
- [ ] UTN AI — asistente con backend FastAPI + Ollama
