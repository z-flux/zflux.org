export interface SingleProduct {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  id: number
  name: string
  subcategory_id: number
  product_type: string
  is_active: boolean
  variants: Variant[]
}

export interface Variant {
  id: number
  sku: string
  name: string
  selling_price: string
  cost_price: string
  ingredients: Ingredient[]
}

export interface Ingredient {
  id: number
  company_id: number
  product_variant_id: number
  item_id: number
  source_type: string
  quantity: string
  unit_id: number
  item_snapshot: any
  created_at: string
  updated_at: string
}
