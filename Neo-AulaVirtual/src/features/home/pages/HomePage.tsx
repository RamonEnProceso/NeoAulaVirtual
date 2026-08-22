import { useState } from 'react'
import { Link } from 'react-router-dom'
import HoySection from '../../../shared/components/HoySection'
import Calendario from '../components/Calendario'
import Pendientes from '../../../shared/components/Pendientes'
import { entregasDelDia, pendientesActivas, toISODate, useEntregadas } from '../../../shared/entregas'
import styles from './HomePage.module.css'

function HomePage() {
  const [seleccion, setSeleccion] = useState<Date | null>(null)
  const entregadas = useEntregadas()

  const hoyISO = toISODate(new Date())
  const totalPendientes = pendientesActivas(entregadas, hoyISO).length

  const tareas = seleccion ? entregasDelDia(seleccion) : []

  const tituloDetalle = seleccion
    ? seleccion.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''
  const tituloDetalleCapitalizado = tituloDetalle.charAt(0).toUpperCase() + tituloDetalle.slice(1)

  return (
    <main className={`${styles.page} ${styles.pageHero}`}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitulo}>Inicio</h1>
      </header>

      <div className={styles.body}>
        <HoySection />

        <section className={styles.seccion}>
          <div className={styles.seccionHeader}>
            <h2 className={styles.seccionTitulo}>Pendientes ({totalPendientes})</h2>
            <Link to="/pendientes" className={styles.verTodos} aria-label="Ver todos los pendientes">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <Pendientes limit={2} />
        </section>

        <section className={styles.seccion}>
          <h2 className={styles.seccionTitulo}>Calendario</h2>
          <Calendario seleccion={seleccion} onSelect={(fecha) => setSeleccion(fecha)} />

          {seleccion && (
            <div className={styles.detalle}>
              <h3 className={styles.detalleTitulo}>{tituloDetalleCapitalizado}</h3>
              {tareas.length === 0 ? (
                <p className={styles.vacio}>Sin entregas este día</p>
              ) : (
                <ul className={styles.lista}>
                  {tareas.map((tarea) => (
                    <li key={tarea.id} className={styles.tarea}>
                      <span className={styles.marcador} aria-hidden="true" />
                      <div className={styles.tareaCuerpo}>
                        <span className={styles.tareaTitulo}>{tarea.titulo}</span>
                        {tarea.materia && <span className={styles.tareaMateria}>{tarea.materia}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default HomePage
