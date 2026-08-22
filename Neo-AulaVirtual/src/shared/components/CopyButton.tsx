import { useEffect, useRef, useState } from 'react'
import styles from './CopyButton.module.css'

interface CopyButtonProps {
  /** Texto a copiar al portapapeles. */
  text: string
  /** Texto accesible del botón. */
  label?: string
}

// Botón de copiar reutilizable: copia `text` y muestra un check por 2s.
function CopyButton({ text, label = 'Copiar' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => window.clearTimeout(timer.current)
  }, [])

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback por si la clipboard API no está disponible (contexto no seguro).
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={copiar}
      aria-label={copied ? 'Copiado' : label}
      title={copied ? 'Copiado' : label}
    >
      {copied ? (
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}

export default CopyButton
