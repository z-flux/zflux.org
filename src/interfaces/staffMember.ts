export interface StaffMember {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  id: number
  company_id: number
  branch_id: number
  name: string
  email: string
  phone: string
  username: string
  is_active: boolean
  created_at: string
  updated_at: string
}
