export interface Invoices {
  success: boolean
  message: string
  data: Invoice[]
}

export interface Invoice {
  id: number
  company_id: number
  branch_id: number
  supplier_id: number
  po_number: string
  status: string
  source: string
  invoice_number?: string
  ordered_at?: string
  expected_at?: string
  received_at?: string
  subtotal: string
  tax: string
  discount: string
  total: string
  notes?: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  supplier: Supplier
  purchase_order_items: PurchaseOrderItem[]
  receipts: Receipt[]
}

export interface Supplier {
  id: number
  company_id: number
  name: string
  contact_person: string
  phone: string
  email: string
  address: string
  is_active: number
  notes: string
  created_at: string
  updated_at: string
}

export interface PurchaseOrderItem {
  id: number
  purchase_order_id: number
  item_id: number
  quantity_ordered: number
  quantity_received: number
  unit_cost: string
  total_cost: string
  created_at: string
  updated_at: string
}

export interface Receipt {
  id: number
  purchase_order_id: number
  received_by: number
  received_at: string
  notes?: string
  created_at: string
  updated_at: string
}
