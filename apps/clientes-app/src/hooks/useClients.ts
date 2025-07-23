import { useEffect, useState } from 'react'
import { getClients } from '../services/api'
import type { Client } from '../types/Client'

export function useClients(page = 1, limit = 10, refresh = 0) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      try {
        const res = await getClients(page, limit)
        setClients(res.data)      
        setTotal(res.total)       
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [page, limit, refresh]) 

  return {
    clients,
    loading,
    total
  }
}
