import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProgressBar from '../../../shared/components/ProgressBar'
import BackButton from '../../../shared/components/BackButton'
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
  /** Materias a listar (correlativas faltantes). */
  lista?: string[]
}

const ORDINALES = ['1er', '2do', '3er', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo']
function ordinalNivel(n: number): string {
  return ORDINALES[n - 1] ?? `${n}º`
}

function AvancePage() {
  const progreso = useProgreso()
  const { carrera } = carreraActual()
  const resumen = calcAvance(carrera, progreso)
  const navigate = useNavigate()
  const [nivel, setNivel] = useState<number | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  const abrirCartelMateria = (id: string) => {
    const faltan = correlativasFaltantes(id, progreso)
    setAviso({
      titulo: materias[id]?.nombre ?? id,
      cuerpo: faltan.length
        ? 'Te falta aprobar:'
        : 'Todavía no podés cursar esta materia.',
      lista: faltan.length ? faltan.map((cid) => materias[cid]?.nombre ?? cid) : undefined,
    })
  }

  const abrirCartelNivel = (n: number) => {
    setAviso({
      titulo: `${ordinalNivel(n)} Nivel`,
      cuerpo: 'No hay materias disponibles todavía.',
    })
  }

  // En el detalle vuelve a la lista de niveles; en la lista, retrocede al historial.
  const volver = () => {
    if (nivel !== null) setNivel(null)
    else navigate(-1)
  }

  const modal = aviso && (
    <div className={styles.overlay} onClick={() => setAviso(null)}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitulo}>{aviso.titulo}</h2>
        <p className={styles.modalCuerpo}>{aviso.cuerpo}</p>
        {aviso.lista && aviso.lista.length > 0 && (
          <ul className={styles.modalLista}>
            {aviso.lista.map((nombre, i) => (
              <li key={i}>{nombre}</li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className={styles.modalBoton}
          onClick={() => setAviso(null)}
        >
          Entendido
        </button>
      </div>
    </div>
  )

  // ---------- Vista DETALLE de un nivel ----------
  if (nivel !== null) {
    const ids = carrera.nivel[String(nivel)]
    const info = resumen.porNivel.find((r) => r.nivel === nivel)

    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.titulo}>{ordinalNivel(nivel)} Nivel</h1>
            <BackButton onClick={volver} />
          </div>
          <ProgressBar value={info?.porcentaje ?? 0} />
          <p className={styles.total}>
            {info?.aprobadas ?? 0}/{info?.total ?? 0} materias aprobadas
          </p>
        </header>

        <div className={styles.grilla}>
          {ids.map((id) => {
            const acceso: Acceso = accesoMateria(id, nivel, carrera, progreso)
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

                {!bloqueada && (
                  <button
                    type="button"
                    className={`${styles.check} ${aprobada ? styles.checkOn : ''}`}
                    onClick={() => toggleAprobada(id)}
                    aria-pressed={aprobada}
                    title={aprobada ? 'Desmarcar aprobada' : 'Marcar aprobada'}
                  >
                    ✓
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {modal}
      </main>
    )
  }

  // ---------- Vista LISTA de niveles ----------
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.titulo}>Avance</h1>
          <BackButton onClick={volver} />
        </div>
        <p className={styles.carrera}>{carrera.nombre_completo}</p>
        <ProgressBar value={resumen.porcentaje} />
        <p className={styles.total}>
          {resumen.aprobadas} de {resumen.total} materias aprobadas
        </p>
      </header>

      {nivelesDe(carrera).map((n) => {
        const info = resumen.porNivel.find((r) => r.nivel === n)
        const gris = (info?.habilitadas ?? 0) === 0
        return (
          <button
            key={n}
            type="button"
            className={`${styles.nivelCard} ${gris ? styles.nivelCardGris : ''}`}
            onClick={() => (gris ? abrirCartelNivel(n) : setNivel(n))}
          >
            <div className={styles.nivelCardTop}>
              <span className={styles.nivelNombre}>{ordinalNivel(n)} Nivel</span>
              <span className={styles.nivelContador}>
                {info?.aprobadas ?? 0}/{info?.total ?? 0}
                <span className={styles.chevron} aria-hidden="true">
                  ›
                </span>
              </span>
            </div>
            <ProgressBar value={info?.porcentaje ?? 0} />
          </button>
        )
      })}

      {modal}
    </main>
  )
}

export default AvancePage
