export interface CreateClientDTO {
  name: string
  salary: number
  companyValuation: number
}

export interface Client extends CreateClientDTO {
  id: number
  createdAt: string
  updatedAt: string
}