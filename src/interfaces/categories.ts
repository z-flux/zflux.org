export interface Categories {
  success: boolean
  message: string
  data: Category[]
}

export interface Category {
  id: number
  company_id: number
  name: string
  description: string
  is_active: boolean
  subcategories: any[]
  created_at: string
  updated_at: string
}