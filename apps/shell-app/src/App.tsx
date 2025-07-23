import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Spinner } from '@teddy-test/ui'

// Lazy load dos microfrontends
const AuthApp = lazy(() => import('../../auth-app/src/App'))
const ClientesApp = lazy(() => import('../../clientes-app/src/pages/ClientsApp'))
const CreateClient = lazy(() => import('../../clientes-app/src/pages/CreateClient'))
const EditClient = lazy(() => import('../../clientes-app/src/pages/EditClient'))

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogin = () => {
      navigate('/clientes')
    }

    window.addEventListener('user-logged-in', handleLogin)
    return () => {
      window.removeEventListener('user-logged-in', handleLogin)
    }
  }, [navigate])

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner size={48} />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthApp />} />
        <Route path="/clientes" element={<ClientesApp />} />
        <Route path="/clientes/new" element={<CreateClient />} />
        <Route path="/clientes/:id/edit" element={<EditClient />} />
      </Routes>
    </Suspense>
  )
}

export default App
