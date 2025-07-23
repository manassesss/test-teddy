import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteClient } from '../services/api'
import { useClients } from '../hooks/useClients'
import {
  Spinner,
  Table,
  Button,
  IconButton,
  Modal,
} from '@teddy-test/ui'
import { Header } from '../components/Header'
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa'

function ClientesApp() {
  const [page, setPage] = useState(1)
  const [refresh, setRefresh] = useState(0)
  const [selectedClients, setSelectedClients] = useState<number[]>([])
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const limit = 10

  const { clients, loading, total } = useClients(page, limit, refresh)
  const navigate = useNavigate()
  const [clientToDelete, setClientToDelete] = useState<number | null>(null)
  const totalPages = total

  const confirmDelete = async () => {
    if (clientToDelete === null) return
    try {
      await deleteClient(clientToDelete)
      setClientToDelete(null)
      setRefresh((prev) => prev + 1)
    } catch (error) {
      console.error('Failed to delete client:', error)
      alert('Failed to delete client.')
    }
  }

  const toggleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([])
    } else {
      setSelectedClients(clients.map((c) => c.id))
    }
  }

  const toggleSelectOne = (id: number) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    )
  }

  const selectAllRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!selectAllRef.current) return
    const allSelected = clients.length > 0 && selectedClients.length === clients.length
    const noneSelected = selectedClients.length === 0
    selectAllRef.current.indeterminate = !allSelected && !noneSelected
  }, [selectedClients, clients])

  if (loading) {
    return (
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
    )
  }

  return (
    <>
      <Header />

      <div style={{ padding: '2rem', paddingTop: '5rem', maxWidth: '100%', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          <h1 style={{ margin: 0, color: '#202020' }}>Clients List</h1>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {selectedClients.length > 0 && (
              <Button variant="info" onClick={() => setIsSelectionModalOpen(true)}>
                View Selected ({selectedClients.length})
              </Button>
            )}
            <Button
              variant="teddy"
              icon={<FaPlus size={14} />}
              onClick={() => navigate('/clientes/new')}
            >
              New Client
            </Button>
          </div>
        </div>

        <Table
          headers={[
            <input
              key="selectAll"
              type="checkbox"
              ref={selectAllRef}
              onChange={toggleSelectAll}
              checked={clients.length > 0 && selectedClients.length === clients.length}
            />,
            'ID',
            'Name',
            'Salary',
            'Valuation',
            'Created At',
            'Updated At',
            'Actions',
          ]}
        >
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedClients.includes(client.id)}
                  onChange={() => toggleSelectOne(client.id)}
                />
              </td>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>R$ {client.salary.toLocaleString()}</td>
              <td>R$ {client.companyValuation.toLocaleString()}</td>
              <td>{new Date(client.createdAt).toLocaleDateString()}</td>
              <td>{new Date(client.updatedAt).toLocaleDateString()}</td>
              <td style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <IconButton
                  icon={<FaEdit size={14} />}
                  variant="primary"
                  rounded
                  onClick={() => navigate(`/clientes/${client.id}/edit`)}
                />
                <IconButton
                  icon={<FaTrash size={14} />}
                  variant="danger"
                  rounded
                  onClick={() => setClientToDelete(client.id)}
                />
              </td>
            </tr>
          ))}
        </Table>

        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            color: '#202020',
          }}
        >
          <IconButton
            variant="teddy"
            rounded
            icon={<FaArrowLeft size={14} />}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
          <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Page {page} of {totalPages}
          </span>
          <IconButton
            variant="teddy"
            rounded
            icon={<FaArrowRight size={14} />}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          />
        </div>
      </div>

      {clientToDelete !== null && (
        <Modal
          title="Confirm Delete"
          type="confirm"
          onClose={() => setClientToDelete(null)}
          onConfirm={confirmDelete}
        >
          Are you sure you want to delete this client?
        </Modal>
      )}

      {isSelectionModalOpen && (
        <Modal
          title="Selected Clients"
          type="info"
          onClose={() => setIsSelectionModalOpen(false)}
        >
          <ul style={{ paddingLeft: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
            {selectedClients.map((id) => {
              const client = clients.find((c) => c.id === id)
              return (
                <li key={id}>
                  {client?.name || 'Unknown'} (ID: {id})
                </li>
              )
            })}
          </ul>
        </Modal>
      )}
    </>
  )
}

export default ClientesApp
