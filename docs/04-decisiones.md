# Decisiones

## Frontend

### React sobre otras librerías
React es la librería frontend más adoptada en la industria.
En un proyecto académico colaborativo, maximizar la cantidad
de potenciales contribuidores es una prioridad. Un alumno
con conocimientos básicos de frontend tiene más chances de
conocer React que Vue, Svelte u otras alternativas.

### CSS Modules sobre Tailwind
Tailwind genera clases utilitarias inline que dificultan
la lectura y el mantenimiento del código en componentes
complejos. CSS Modules mantiene la separación entre
estructura y estilo, produciendo componentes más legibles
para un equipo académico con distintos niveles de experiencia.

### Mobile-first sobre responsive genérico
La plataforma actual fue diseñada desktop-first. El caso
de uso más frecuente del estudiante es el acceso desde
el celular durante o entre clases. Diseñar mobile-first
garantiza que la experiencia principal esté resuelta antes
de escalar a pantallas más grandes.

### Data mockeada sobre integración directa con la API UTN
La API institucional de la UTN no es pública ni está
documentada. Para el MVP del prototipo, los datos se
mockean replicando la estructura esperada. Esto permite
avanzar en la interfaz sin depender de acceso institucional.