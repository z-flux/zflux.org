export interface Devices {
  success: boolean
  message: string
  data: Device[]
}

export interface Device {
  id: number
  company_id: number
  name: string
  identifier: string
  branch_id: number
  is_active: boolean
  last_seen_at: any
  created_at: string
  updated_at: string
  branch: Branch
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
  created_at: string
  updated_at: string
  deleted_at: any
}
