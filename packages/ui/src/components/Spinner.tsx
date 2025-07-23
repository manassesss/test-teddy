// Spinner.tsx
import { CSSProperties, useEffect } from 'react'

export function Spinner({ size = 32 }: { size?: number }) {
  const style: CSSProperties = {
    width: size,
    height: size,
    border: '4px solid #ccc',
    borderTop: '4px solid #EB6625',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    fontFamily: 'Montserrat, sans-serif',
  }

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return <div style={style} />
}
