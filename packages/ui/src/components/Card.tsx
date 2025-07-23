import { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  style?: CSSProperties
}

export function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: 8,
        width: '100%',
        maxWidth: 400,
        fontFamily: 'Montserrat, sans-serif',
        ...style
      }}
    >
      {children}
    </div>
  )
}
