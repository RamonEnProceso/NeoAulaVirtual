# Decisiones

> Registro de decisiones técnicas y sus motivos. Actualizado al **24/08/2026**.

## Frontend

### React sobre otras librerías
React es la librería frontend más adoptada en la industria. En un proyecto académico colaborativo, maximizar la cantidad de potenciales contribuidores es una prioridad. Un alumno con conocimientos básicos de frontend tiene más chances de conocer React que Vue, Svelte u otras alternativas.

### CSS Modules sobre Tailwind
Tailwind genera clases utilitarias inline que dificultan la lectura y el mantenimiento del código en componentes complejos. CSS Modules mantiene la separación entre estructura y estilo, produciendo componentes más legibles para un equipo académico con distintos niveles de experiencia.

### Mobile-first sobre responsive genérico
El caso de uso más frecuente del estudiante es el acceso desde el celular durante o entre clases (42% consulta desde el teléfono, 54% considera incómodo el Aula Virtual desde el celular — [encuesta](./05-encuesta.md)). Diseñar mobile-first garantiza que la experiencia principal esté resuelta antes de escalar a pantallas más grandes.

### TypeScript estricto
Compilación estricta en TypeScript valida cada iteración de la interfaz en tiempo de desarrollo y mantiene la lógica de dominio (cálculo de avance, peso académico, filtrado de comisiones) aislada de la interfaz.

### Arquitectura feature-based
Organización por funcionalidades: la capa `app` concentra el enrutado y el layout; la capa `features` agrupa cada dominio funcional (inicio, materias, horarios, avance, perfil, notificaciones); la capa `shared` reúne los componentes reutilizables y la lógica de dominio compartida.

## Datos

### Plan de estudios como JSON estructurado (en lugar de API institucional)
La API institucional de la UTN no es pública ni está documentada. El plan de estudios se modela como un JSON estructurado (`Neo-AulaVirtual/src/assets/plan_estudios.json`) con la totalidad de las materias y sus correlatividades, lo que permite validar la aplicación con **datos reales del plan vigente** y mantener la lógica de correlatividades dentro de cada materia (ante un cambio de especialidad, las materias aprobadas se conservan).

### Persistencia local con localStorage
Decisión acorde al alcance: aplicación personal de usuario único, sin requisitos de sincronización ni backend. El progreso del alumno (materias aprobadas y entregas realizadas) se persiste localmente. La sincronización en la nube queda como línea futura.

## Despliegue

### Firebase Hosting
Despliegue en producción sin infraestructura propia, con dominio público (https://neo-aula-virtual.web.app). Elección natural para una SPA estática sin backend.

### Capacitor para APK
Empaquetado de la aplicación web como APK instalable para Android, permitiendo su uso como aplicación nativa en dispositivos móviles sin reescribir la interfaz.
