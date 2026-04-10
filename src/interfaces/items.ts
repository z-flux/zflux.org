export interface Items {
  success: boolean
  message: string
  data: ItemsData
}

export interface ItemsData {
  current_page: number
  data: Item[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
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
  purchase_unit: PurchaseUnit
  base_unit: BaseUnit
}

export interface PurchaseUnit {
  id: number
  name: string
  symbol: string
  type: string
  created_at: string
  updated_at: string
}

export interface BaseUnit {
  id: number
  name: string
  symbol: string
  type: string
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}
