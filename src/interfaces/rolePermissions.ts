export interface RolePermissions {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  name: string
  permissions: string[]
  created_at: string
  updated_at: string
}
