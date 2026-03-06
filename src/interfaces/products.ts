export interface Products {
  success: boolean
  message: string
  data: Product[]
}

export interface Product {
  id: number
  company_id: number
  category_id: number
  subcategory_id: any
  name: string
  sku: string
  description: any
  price: string
  image: any
  is_active: boolean
  category: any
  subcategory: any
  stocks: Stock[]
  created_at: string
  updated_at: string
}

export interface Stock {
  id: number
  product_id: number
  branch_id: number
  quantity: number
  min_limit: number
  created_at: string
  updated_at: string
}
