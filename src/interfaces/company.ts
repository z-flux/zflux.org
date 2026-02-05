export interface Companies {
  success: boolean
  message: string
  data: Company[]
}

export interface Company {
  id: number
  name: string
  email: string
  phone: string
  address: string
  website: string
  tax_number: string
  commercial_register: string
  status: string
  subscription_plan: string
  subscription_start: string
  subscription_end: string
  max_users: string
  max_branches: string
  multi_branch: boolean
  currency: string
  timezone: string
  language: string
  settings: Settings
  notes: string
  is_active: boolean
  subscription_days_left: number
  can_add_user: boolean
  branches_count: any
  users_count: any
  branches: Branch[]
  users: any[]
  created_at: string
  updated_at: string
}

export interface Settings {
  enable_inventory: boolean
  enable_reports: boolean
  enable_online_payments: boolean
  low_stock_alert: boolean
  backup_enabled: boolean
  api_access?: boolean
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
  created_at: string
  updated_at: string
}
