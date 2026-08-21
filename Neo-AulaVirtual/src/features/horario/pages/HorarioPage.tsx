import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { comisiones, NOMBRE_DIA, ABREV_DIA } from '../../../shared/comisiones'
import { deManana, diaHoy, diaManana } from '../../../shared/selectMaterias'
import { manana, DIAS_TAB } from '../../../shared/utils/date'
import type { DiaSemana } from '../../../shared/types/comision'
import HoySection from '../../../shared/components/HoySection'
import ListaComisiones from '../../../shared/components/ListaComisiones'
import BackButton from '../../../shared/components/BackButton'
import styles from './HorarioPage.module.css'

function HorarioPage() {
  const [seleccionado, setSeleccionado] = useState<DiaSemana>(diaHoy)
  const navigate = useNavigate()

  const delSeleccionado = comisiones.filter((c) => c.dia === seleccionado)

  return (
    <main className={styles.page}>
      <div className={styles.headerTop}>
        <h1 className={styles.titulo}>Horarios</h1>
        <BackButton onClick={() => navigate(-1)} />
      </div>

      <HoySection />

      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>
          Mañana
          <span className={styles.seccionFecha}>
            {NOMBRE_DIA[diaManana]} · {manana.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}
          </span>
        </h2>
        <ListaComisiones comisiones={deManana} horizontal />
      </section>

      <nav className={styles.tabs} aria-label="Días de la semana">
        {DIAS_TAB.map((dia) => (
          <button
            key={dia}
            type="button"
            className={dia === seleccionado ? `${styles.tab} ${styles.tabActiva}` : styles.tab}
            onClick={() => setSeleccionado(dia)}
            aria-pressed={dia === seleccionado}
          >
            {ABREV_DIA[dia]}
          </button>
        ))}
      </nav>

      <section className={styles.seccion}>
        <h3 className={styles.diaTitulo}>{NOMBRE_DIA[seleccionado]}</h3>
        <ListaComisiones comisiones={delSeleccionado} />
      </section>
    </main>
  )
}

export default HorarioPage
