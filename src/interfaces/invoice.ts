export interface SingleInvoice {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  id: number
  company_id: number
  branch_id: number
  supplier_id: number
  po_number: string
  status: string
  source: string
  invoice_number: any
  ordered_at: string
  expected_at: string
  received_at: any
  subtotal: string
  tax: string
  discount: string
  total: string
  notes: any
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  supplier: Supplier
  purchase_order_items: PurchaseOrderItem[]
  receipts: any[]
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
