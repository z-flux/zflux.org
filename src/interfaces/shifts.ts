import { Branch } from "./branch"

export interface Shifts {
  success: boolean
  message: string
  data: Shift[]
}

export interface Shift {
  id: number
  branch_id: number
  name: string
  start_time: string
  end_time: string
  is_active: boolean
  branch: Branch
  created_at: string
  updated_at: string
}


