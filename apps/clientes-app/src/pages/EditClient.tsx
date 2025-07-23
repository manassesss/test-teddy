import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateClient, api } from '../services/api'
import type { Client } from '../types/Client'
import { Header } from '../components/Header'
import { Button, Input } from '@teddy-test/ui'

function EditClient() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [valuation, setValuation] = useState('')

  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await api.get(`/users/${id}`)
        const data: Client = res.data
        setClient(data)
        setName(data.name)
        setSalary(String(data.salary))
        setValuation(String(data.companyValuation))
      } catch (error) {
        console.error('Error loading client:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsedSalary = Number(salary)
    const parsedValuation = Number(valuation)

    if (parsedSalary < 0 || parsedValuation < 0) {
      alert('Salary and Valuation must be non-negative numbers.')
      return
    }

    try {
      await updateClient(Number(id), {
        name,
        salary: parsedSalary,
        companyValuation: parsedValuation
      })
      navigate('/clientes')
    } catch (error) {
      console.error('Error updating client:', error)
    }
  }

  if (loading) return <p>Loading client...</p>
  if (!client) return <p>Client not found.</p>

  return (
    <>
      <Header />
      <div style={{ margin: '80px auto 0', paddingTop: '5rem', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1>Edit Client</h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              min={0}
              required
            />
            <Input
              type="number"
              placeholder="Company Valuation"
              value={valuation}
              onChange={(e) => setValuation(e.target.value)}
              min={0}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button type="submit" variant="teddy">
                Update
              </Button>
              {/* <Button type="button" variant="danger" onClick={() => navigate('/clientes')}>
                Cancel
              </Button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditClient
