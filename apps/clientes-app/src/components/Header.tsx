import { Button, IconButton } from '@teddy-test/ui'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import { FaArrowLeft } from 'react-icons/fa'

export function Header() {
  const navigate = useNavigate()
  const { name, setName } = useUserStore()

  const handleLogout = () => {
    setName('')
    window.dispatchEvent(new CustomEvent('user-logged-out'))
    navigate('/login') // força o redirecionamento
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        color: '#EB6625',
        backgroundColor: '#202020',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        zIndex: 1000,
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <IconButton
        variant='teddy'
        rounded
        icon={<FaArrowLeft size={14} />}
        onClick={() => navigate(-1)}
      />

      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
        Welcome, {name}!
      </div>

      <Button variant="teddy" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  )
}
