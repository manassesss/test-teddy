import { ButtonHTMLAttributes, ReactNode, useState } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'teddy' | 'info'
  children?: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function Button({
  variant = 'primary',
  icon,
  iconPosition = 'left',
  children,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseColors = {
    primary: '#007bff',
    danger: '#dc3545',
    teddy: '#EB6625',
    info: 'transparent',
  }

  const hoverColors = {
    primary: '#0056b3',
    danger: '#b02a37',
    teddy: '#cc4f10',
    info: '#f2f2f2',
  }

  const textColors = {
    primary: 'white',
    danger: 'white',
    teddy: 'white',
    info: '#333',
  }

  const borderStyles = {
    primary: 'none',
    danger: 'none',
    teddy: 'none',
    info: '1px solid #ccc',
  }

  const currentBg = isHovered ? hoverColors[variant] : baseColors[variant]
  const currentText = textColors[variant]
  const currentBorder = borderStyles[variant]
  const hasBoth = icon && children

  return (
    <button
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: currentBg,
        color: currentText,
        padding: '0.8rem 0.8rem',
        border: currentBorder,
        borderRadius: 4,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: hasBoth ? 6 : 0,
        fontSize: 14,
        fontFamily: 'Montserrat, sans-serif',
        transition: 'background-color 0.2s ease-in-out',
        ...props.style
      }}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  )
}
