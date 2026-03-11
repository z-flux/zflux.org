"use client"

import { Session } from "next-auth"
import { useRouter } from "next/navigation"

export function SuperAdminBanner({ session }:{session:Session | null} ) {
  const router = useRouter()

  if (!session?.user?.user?.is_super_admin) return null

  return (
    
      <div className="fixed bg-amber-500 z-50 text-black px-4 py-2 w-full flex justify-between">
        <span>Super Admin As a company</span>
        <button className="bg-main  px-4 py-1 rounded-lg cursor-pointer" onClick={() => router.push("/superadmin")}>
          Exit Company
        </button>
      </div>
   
  )
}