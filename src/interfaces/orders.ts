import { Branch } from "./branch"
import { Customer } from "./customers"

export interface Orders {
  success: boolean
  message: string
  data: Order[]
}

export interface Order {
  id: number
  company_id: number
  branch_id: number
  customer_id: number
  user_id: number
  status: string
  total_amount: string
  tax_amount: any
  discount_amount: any
  payment_method: string
  payment_status: string
  notes: any
  customer: Customer
  branch: Branch
  items: Item[]
  created_at: string
  updated_at: string
}

export interface Item {
  id: number
  product_id: number
  quantity: number
  unit_price: string
  total_price: string
  product_name: string
  created_at: string
}
