import { Branch } from "./branch"
import { Product } from "./products"

export interface Stocks {
  success: boolean
  message: string
  data: Stock[]
}

export interface Stock {
  id: number
  company_id: number
  branch_id: number
  quantity_in_base_unit: string
  reserved_quantity: string
  min_stock_level: string
  unit_cost_per_base: string
  total_value: string
  created_at: string
  updated_at: string
  item_id: number
  item: Item
  branch: Branch
}

export interface Item {
  id: number
  company_id: number
  sku: string
  name: string
  description: string
  cost_price: string
  purchase_unit_id: number
  base_unit_id: number
  is_active: boolean
  min_stock_level: number
  max_stock_level: number
  created_at: string
  updated_at: string
}