import { useClients } from './hooks/useClients'
import { useNavigate } from 'react-router-dom'
import { deleteClient } from './services/api'

function ClientesApp() {
  const { clients, loading, refresh } = useClients()
  const navigate = useNavigate()
  const handleDelete = async (id: number) => {
  const confirmed = confirm('Are you sure you want to delete this client?')
  if (!confirmed) return

  try {
    await deleteClient(id)
    refresh()
  } catch (error) {
    console.error('Failed to delete client:', error)
    alert('Failed to delete client.')
  }
}

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Clients List</h1>
      <button onClick={() => navigate('/clientes/new')} style={{ marginBottom: '1rem' }}>
        + New Client
      </button>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Valuation</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th> {/* nova coluna */}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>${client.salary.toLocaleString()}</td>
              <td>${client.companyValuation.toLocaleString()}</td>
              <td>{new Date(client.createdAt).toLocaleDateString()}</td>
              <td>{new Date(client.updatedAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => navigate(`/clientes/${client.id}/edit`)}>Edit</button>{' '}
                <button onClick={() => handleDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientesApp