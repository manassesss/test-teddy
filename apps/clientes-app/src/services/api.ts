// apps/clientes-app/src/services/api.ts
import axios from 'axios'
import type { Client, CreateClientDTO } from '../types/Client'

export const api = axios.create({
  baseURL: 'https://boasorte.teddybackoffice.com.br',
  headers: {
    'Content-Type': 'application/json'
  }
})

// GET all clients
export async function getClients(page = 1, limit = 10): Promise<{ data: Client[]; total: number }> {
  const response = await api.get('/users', {
    params: { page, limit }
  })
  const total = response.data.totalPages

  return {data: response.data.clients, total}
}

// POST create client
export async function createClient(data: CreateClientDTO): Promise<Client> {
  const response = await api.post('/users', data)
  return response.data
}

// PUT update client
export async function updateClient(id: number, data: Partial<CreateClientDTO>): Promise<Client> {
  const response = await api.patch(`/users/${id}`, data)
  return response.data
}

// DELETE client
export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/users/${id}`)
}
