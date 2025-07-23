import { useUserStore } from './stores/useUserStore'
import { useState } from 'react'
import { Button, Input, Card  } from '@teddy-test/ui'

function AuthApp() {
  const setName = useUserStore((state) => state.setName)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) {
      setError('Please, enter your name.')
      return
    }
    setError('')
    setName(input)
    window.dispatchEvent(new CustomEvent('user-logged-in'))
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '1rem',
        backgroundColor: '#202020',
      }}
    >
        <Card style={{backgroundColor: "transparent"}}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'white'}}
          >
            <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Access</h1>
            <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Enter your name to access the application.</p>
            <Input
              type="text"
              placeholder="Name"
              value={input}
              error={error}
              onChange={(e) => setInput(e.target.value)}
              required
            />

            <Button type="submit" variant="teddy">
              Enter
            </Button>
          </form>
        </Card>
    </div>
  )
}

export default AuthApp
