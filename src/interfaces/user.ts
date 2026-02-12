export interface Users {
  success: boolean
  message: string
  data: User[]
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  company_id: any
  branch_id: any
  hire_date?: string
  salary?: string
  status: string
  settings: object
  last_login_at: any
  last_login_ip: any
  company: any
  branch: any
  roles: string[]
  created_at: string
  updated_at: string
}


