export interface Permissions {
  success: boolean
  message: string
  data: Permission[]
}

export interface Permission {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
}
