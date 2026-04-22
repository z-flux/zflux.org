export type Suppliers = Supplier[]

export interface Supplier {
  id: number
  company_id: number
  name: string
  contact_person: string
  phone: string
  email: string
  address: string
  is_active: number
  notes: string
  created_at: string
  updated_at: string
}
