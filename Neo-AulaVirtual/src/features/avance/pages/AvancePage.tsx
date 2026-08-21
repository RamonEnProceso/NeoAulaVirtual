import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../../../shared/components/ProgressBar'
import { materias } from '../../../shared/plan'
import { carreraActual, toggleAprobada, useProgreso } from '../../../shared/progreso'
import {
  accesoMateria,
  calcAvance,
  correlativasFaltantes,
  nivelesDe,
} from '../../../shared/avance'
import type { Acceso } from '../../../shared/avance'
import styles from './AvancePage.module.css'

interface Aviso {
  titulo: string
  cuerpo: string
}

function AvancePage() {
  const progreso = useProgreso()
  const { carrera } = carreraActual()
  const resumen = calcAvance(carrera, progreso)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  const abrirCartelMateria = (id: string) => {
    const faltan = correlativasFaltantes(id, progreso)
    const lista = faltan.map((cid) => materias[cid]?.nombre ?? cid).join(', ')
    setAviso({
      titulo: materias[id]?.nombre ?? id,
      cuerpo: faltan.length
        ? `Te falta aprobar: ${lista}.`
        : 'Todavía no podés cursar esta materia.',
    })
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Avance</h1>
        <p className={styles.carrera}>{carrera.nombre_completo}</p>
        <ProgressBar value={resumen.porcentaje} />
        <p className={styles.total}>
          {resumen.aprobadas} de {resumen.total} materias aprobadas
        </p>
      </header>

      {nivelesDe(carrera).map((n) => {
        const ids = carrera.nivel[String(n)]
        const info = resumen.porNivel.find((r) => r.nivel === n)
        const gris = (info?.habilitadas ?? 0) === 0

        const headerContenido = (
          <>
            <span className={styles.nivelNombre}>Nivel {n}</span>
            <span className={styles.nivelContador}>
              {info?.aprobadas ?? 0}/{info?.total ?? 0}
            </span>
          </>
        )

        return (
          <section key={n} className={`${styles.nivel} ${gris ? styles.nivelGris : ''}`}>
            {gris ? (
              <button
                type="button"
                className={`${styles.nivelHeader} ${styles.nivelHeaderBtn}`}
                onClick={() =>
                  setAviso({
                    titulo: `Nivel ${n}`,
                    cuerpo: 'No tenés materias habilitadas en este nivel.',
                  })
                }
              >
                {headerContenido}
              </button>
            ) : (
              <div className={styles.nivelHeader}>{headerContenido}</div>
            )}

            <div className={styles.grilla}>
              {ids.map((id) => {
                const acceso: Acceso = accesoMateria(id, n, carrera, progreso)
                const nombre = materias[id]?.nombre ?? id
                const bloqueada = acceso === 'bloqueada'
                const aprobada = progreso.materias[id]?.aprobada ?? false

                return (
                  <div key={id} className={`${styles.materia} ${styles[acceso]}`}>
                    {bloqueada ? (
                      <button
                        type="button"
                        className={styles.materiaBoton}
                        onClick={() => abrirCartelMateria(id)}
                      >
                        {nombre}
                      </button>
                    ) : (
                      <Link className={styles.materiaBoton} to={`/materia/${id}`}>
                        {nombre}
                      </Link>
                    )}

                    <button
                      type="button"
                      className={`${styles.check} ${aprobada ? styles.checkOn : ''}`}
                      onClick={() => toggleAprobada(id)}
                      aria-pressed={aprobada}
                      title={aprobada ? 'Desmarcar aprobada' : 'Marcar aprobada'}
                    >
                      ✓
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {aviso && (
        <div className={styles.overlay} onClick={() => setAviso(null)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitulo}>{aviso.titulo}</h2>
            <p className={styles.modalCuerpo}>{aviso.cuerpo}</p>
            <button
              type="button"
              className={styles.modalBoton}
              onClick={() => setAviso(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default AvancePage
