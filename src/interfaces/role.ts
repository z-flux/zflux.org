export interface Roles {
  success: boolean
  message: string
  data: Role[]
}

export interface Role {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
}
