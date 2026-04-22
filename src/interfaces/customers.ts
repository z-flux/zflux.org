export interface Customers {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  current_page: number
  data: Customer[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Customer {
  id: number
  company_id: number
  name: string
  email: string
  phone: string
  address: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}
