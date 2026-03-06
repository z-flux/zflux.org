export interface Subcategories {
  success: boolean
  message: string
  data: Subcategory[]
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
  description: string
  is_active: boolean
  category: any
  created_at: string
  updated_at: string
}
