"use client"

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: 'primary' | 'danger' | 'teddy'
  size?: number
  rounded?: boolean
}

export function IconButton({
  icon,
  variant = 'primary',
  size = 32,
  rounded = false,
  ...props
}: IconButtonProps) {
  const backgroundColors: Record<NonNullable<IconButtonProps['variant']>, string> = {
    primary: '#007bff',
    danger: '#dc3545',
    teddy: '#EB6625',
  }

  const color = backgroundColors[variant]
  const borderRadius = rounded ? '50%' : 4

  return (
    <button
      {...props}
      style={{
        backgroundColor: color,
        color: 'white',
        border: 'none',
        borderRadius,
        cursor: 'pointer',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'Montserrat, sans-serif',
        transition: 'background-color 0.2s',
        ...props.style,
      }}
      onMouseOver={(e) => {
        (e.currentTarget.style.backgroundColor = darken(color, 0.1))
      }}
      onMouseOut={(e) => {
        (e.currentTarget.style.backgroundColor = color)
      }}
    >
      {icon}
    </button>
  )
}

// Função utilitária simples para escurecer a cor
function darken(hex: string, amount: number) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - amount * 255)
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255)
  const b = Math.max(0, (num & 0x0000ff) - amount * 255)
  return `rgb(${r}, ${g}, ${b})`
}
