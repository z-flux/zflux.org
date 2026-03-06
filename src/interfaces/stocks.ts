import { Branch } from "./branch"
import { Product } from "./products"

export interface Stocks {
  success: boolean
  message: string
  data: Stock[]
}

export interface Stock {
  id: number
  product_id: number
  branch_id: number
  quantity: number
  min_limit: number
  product: Product
  branch: Branch
  created_at: string
  updated_at: string
}




