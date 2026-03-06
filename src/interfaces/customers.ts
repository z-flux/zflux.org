export interface Customers {
  success: boolean
  message: string
  data: Customer[]
}

export interface Customer {
  id: number
  company_id: number
  name: string
  email: string
  phone: string
  address: any
  city: any
  country: any
  created_at: string
  updated_at: string
}