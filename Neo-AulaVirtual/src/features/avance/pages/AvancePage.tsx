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
  estadoNivel,
  nivelesDe,
} from '../../../shared/avance'
import type { Acceso, EstadoNivel } from '../../../shared/avance'
import styles from './AvancePage.module.css'

interface Aviso {
  titulo: string
  cuerpo: string
  /** Materias a listar (correlativas faltantes). */
  lista?: string[]
}

const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
function numeroRomano(n: number): string {
  return ROMANOS[n - 1] ?? String(n)
}

const ESTADO_CLASE: Record<EstadoNivel, string> = {
  completado: styles.nivelCompletado,
  cursando: styles.nivelCursando,
  habilitado: styles.nivelHabilitado,
  noHabilitado: styles.nivelNoHabilitado,
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
      titulo: `Nivel ${numeroRomano(n)}`,
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
            <h1 className={styles.titulo}>Nivel {numeroRomano(nivel)}</h1>
            <BackButton onClick={volver} />
          </div>
          <ProgressBar value={info?.porcentaje ?? 0} tone={(info?.porcentaje ?? 0) >= 100 ? 'green' : 'amber'} />
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
    <main className={`${styles.page} ${styles.pageHero}`}>
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <h1 className={styles.heroTitulo}>Tu Avance</h1>
          <BackButton onClick={volver} />
        </div>
        <div className={styles.barra}>
        <p className={styles.heroCarrera}>{carrera.nombre_completo}</p>
        <ProgressBar value={resumen.porcentaje} tone={resumen.porcentaje >= 100 ? 'green' : 'amber'} />
        <p className={styles.heroTotal}>
          {resumen.aprobadas} de {resumen.total} materias aprobadas
        </p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.grillaNiveles}>
          {nivelesDe(carrera).map((n) => {
            const info = resumen.porNivel.find((r) => r.nivel === n)
            const estado = estadoNivel(n, carrera, progreso)
            const puedeEntrar = (info?.habilitadas ?? 0) > 0
            return (
              <button
                key={n}
                type="button"
                className={`${styles.nivelCard} ${ESTADO_CLASE[estado]} ${puedeEntrar ? '' : styles.nivelCardApagada}`}
                onClick={() => (puedeEntrar ? setNivel(n) : abrirCartelNivel(n))}
              >
                <div className={styles.nivelCardTop}>
                  <span className={styles.nivelRomano}>
                    <span className={styles.nivelRomanoTexto}>Nivel</span>
                    <span className={styles.nivelRomanoNumero}>{numeroRomano(n)}</span>
                  </span>
                </div>
                <ProgressBar value={info?.porcentaje ?? 0} tone={estado === 'completado' ? 'green' : 'amber'} />
              </button>
            )
          })}
        </div>
      </div>

      {modal}
    </main>
  )
}

export default AvancePage
