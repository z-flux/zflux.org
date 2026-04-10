export type Units = Unit[]

export interface Unit {
  id: number
  name: string
  symbol: string
  type: string
  created_at: string
  updated_at: string
  to_conversions: any[]
}
