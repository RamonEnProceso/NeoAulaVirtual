import PaperIcon from '../../../assets/icons/Paper.svg?react'
import Avatar from '../../../shared/components/Avatar'
import styles from './NotificationsPage.module.css'

interface Notificacion {
  titulo: string
  tiempo: string
  /** Opcional: foto dentro del círculo. Si no se pasa, se muestra el ícono por defecto. */
  imagen?: string
}

const notificaciones: Notificacion[] = [
  { titulo: 'AM1 Análisis Matemático I - No habrán clases mañana', tiempo: 'Hace 2 horas', imagen: './materias/notificaciones/AM1.png' },
  { titulo: 'Algoritmos y Estructura... - TP3 se entrega en 2 días', tiempo: 'Hace 1 día' },
  { titulo: 'Física II - El final es en 2 semanas', tiempo: 'Hace 1 día' },
  { titulo: 'Todavía no entregaste la documentación necesaria...', tiempo: 'Hace 2 horas', imagen: './photos/perfil.jpg' },
]

// La rayita (" - ") separa la materia del contenido de la alerta.
function separarTitulo(titulo: string): { materia: string; contenido: string } {
  const i = titulo.indexOf(' - ')
  if (i === -1) return { materia: '', contenido: titulo }
  return { materia: titulo.slice(0, i), contenido: titulo.slice(i + 3) }
}

function NotificationsPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.titulo}>Notificaciones</h1>
      <ul className={styles.lista}>
        {notificaciones.map(({ titulo, tiempo, imagen }) => {
          const { materia, contenido } = separarTitulo(titulo)
          return (
            <li key={titulo} className={styles.item}>
              <span className={styles.icono} aria-hidden="true">
                {imagen ? <Avatar src={imagen} alt="" size={48} /> : <PaperIcon />}
              </span>
              <div className={styles.cuerpo}>
                {materia && <p className={styles.materia}>{materia}</p>}
                <p className={styles.mensaje}>{contenido}</p>
                <p className={styles.tiempo}>{tiempo}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default NotificationsPage
