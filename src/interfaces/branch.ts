import { Company } from "./company"
import { User } from "./user"

export interface Branches {
  success: boolean
  message: string
  data: Branch[]
}

export interface Branch {
  id: number
  company_id: number
  name: string
  code: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  postal_code: any
  is_main: boolean
  status: string
  manager_name: string
  manager_phone: string
  opening_time: string
  closing_time: string
  timezone: string
  currency: string
  tax_rate: string
  settings: any
  is_active: boolean
  is_open: boolean
  users_count: any
  company?: Company
  users: User[]
  created_at: string
  updated_at: string
}






