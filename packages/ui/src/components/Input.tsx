import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {label && <label htmlFor={props.id}>{label}</label>}
        <input
          ref={ref}
          {...props}
          style={{
            padding: '0.8rem',
            border: '1px solid #ccc',
            borderRadius: 5,
            fontFamily: 'Montserrat, sans-serif',
            ...(error && { borderColor: '#dc3545' }),
            ...props.style
          }}
        />
        {error && (
          <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
