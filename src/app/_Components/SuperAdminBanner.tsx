"use client"

import { SpecificCompany } from "@/interfaces/company"
import { useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { LogOut } from "lucide-react"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"

export function SuperAdminBanner({ session }:{session:Session | null} ) {
  const router = useRouter()
  const companyId = getCookie("company-id")
    const { data } = useQuery<SpecificCompany>({
      queryKey: ['company'],
      queryFn: async () => {
    const res = await fetch(`/api/dashboard/company/${companyId}`)
    const payload = await res.json()
    return payload
  },
    })
  const companyName = data?.data.name
  if (!session?.user?.user?.is_super_admin) return null

  return (
    <div className="fixed dark:bg-[#1D1D1D]  z-50 dark:text-white bg-[#f1f1f1] text-black px-4 py-1  w-full flex justify-between">
      <span>{companyName}</span>
      <button className="bg-main  px-4 py-1 rounded-lg cursor-pointer dark:text-white text-black " onClick={() => router.push("/superadmin")}>
        <LogOut className="size-5 rtl:rotate-180"/>
      </button>
    </div>
  )
}