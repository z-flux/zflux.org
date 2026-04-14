export interface Products {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  current_page: number
  data: Product[]
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

export interface Product {
  id: number
  name: string
  created_at: string
  variants_count: number
}

export interface Link {
  url?: string
  label: string
  active: boolean
}
