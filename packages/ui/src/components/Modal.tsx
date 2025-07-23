import type { ReactNode } from 'react'
import { Button } from './Button'

type ModalType = 'confirm' | 'info'

interface ModalProps {
  title?: string
  children: ReactNode
  onClose: () => void
  onConfirm?: () => void
  type?: ModalType
}

export function Modal({
  title = 'Confirm',
  children,
  onClose,
  onConfirm,
  type = 'confirm',
}: ModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        <div style={{ marginBottom: '1.5rem' }}>{children}</div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          {type === 'confirm' ? (
            <>
              <Button variant="info" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                variant="danger"
                style={{ padding: '0.5rem 1rem' }}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>
              OK
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
