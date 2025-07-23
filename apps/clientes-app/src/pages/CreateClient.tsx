import { useState } from 'react'
import { createClient } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Input, Button } from '@teddy-test/ui'

function CreateClient() {
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [valuation, setValuation] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createClient({
      name,
      salary: Number(salary),
      companyValuation: Number(valuation)
    })
    navigate('/clientes')
  }

  return (
    <>
      <Header />

      <div
        style={{
          padding: '2rem 1rem',
          maxWidth: '500px',
          margin: '80px auto 0',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create New Client</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
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
            required
            min={0}
          />
          <Input
            type="number"
            placeholder="Company Valuation"
            value={valuation}
            onChange={(e) => setValuation(e.target.value)}
            required
            min={0}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button type="submit" variant="teddy">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateClient
