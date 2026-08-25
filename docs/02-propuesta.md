# Propuesta

> ¿Qué construye el proyecto?
>Separación entre lo **implementado** y lo **futuro** (alineada al paper).

## Núcleo implementado

### Modelado del plan de estudios
- Plan de estudios modelado en un JSON estructurado (`Neo-AulaVirtual/src/assets/plan_estudios.json`), con la totalidad de las materias y sus requisitos de regularización y aprobación como listas independientes.
- **Lógica de correlatividades por materia**: ante un cambio de especialidad, las materias aprobadas se mantienen.
- Las comisiones (día, horario, ubicación), las entregas (fecha) y el perfil del estudiante se modelan como conjuntos independientes de datos.

### Seguimiento visual del avance
- **"Tu Avance"** — seguidor de carrera que muestra la progresión por niveles y la habilitación de materias según el estado real del alumno.
- **Verificación interactiva de correlatividades**: qué materias puede cursar según su estado (Aprobado / Cursando / Regularizado).
- **Peso académico** calculado conforme al reglamento vigente.

### Vida académica integrada
- **Pantalla de inicio** — horarios del día, pendientes con niveles de urgencia (semáforo de colores + contadores de días restantes) y calendario mensual con las fechas de entrega.
- **Perfil** — consolida el legajo y el peso académico.
- **Detalle de materia** — estado, correlativas requeridas y habilitadas. El contenido de cursada (apuntes, entregas, comunicados) continúa gestionándose desde el Aula Virtual institucional.
- **Notificaciones** de entregas próximas.

### Persistencia y despliegue
- Progreso del alumno persistido localmente con **localStorage** (aplicación personal de usuario único, sin backend).
- **Firebase Hosting** — producción en https://neo-aula-virtual.web.app
- Validación de cada funcionalidad con **casos de prueba sobre datos reales del plan**, verificando escenarios de correlatividad.

<div align="center">
  <img src="./assets/screenshots/seguidorDeCarrera.webp" width="260" alt="Seguidor de carrera Tu Avance"/><br>
  <img src="./assets/screenshots/pesoAcademico.webp" width="260" alt="Peso académico y pendientes"/>
</div>

## Líneas futuras

> Definidas en el paper como trabajo futuro.

- **Sincronización en la nube** — arquitectura orientada a microservicios: respaldo y sincronización entre dispositivos, e integración con los sistemas institucionales para actualizar comisiones, calificaciones y legajo.
- **Generalización a otras sedes** — el modelado es aplicable a cualquier facultad regional; extenderlo al ecosistema de la UTN a nivel país.
- **Contenido de cursada integrado** — absorbido dentro de la interfaz de forma más orgánica que el Aula Virtual actual, sin perder la simplicidad mobile-first.
- **Mapa interactivo de aulas** — orientación al ingresante usando la ubicación de cada comisión.
- **Herramientas de productividad** — temporizador de estudio (Pomodoro), conversor de bases numéricas.
- **Sistema de logros y gamificación** — confeti al aprobar, hitos visibles en el perfil.
- **Asistente con IA** — recupera información de la normativa institucional y señala fuentes, fomentando la lectura del material original (backend FastAPI + Ollama).