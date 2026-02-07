import { Companies } from "@/interfaces/company"

export const fetchCompanies = async (): Promise<Companies> => {
  const res = await fetch('/api/dashboard/companies')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}