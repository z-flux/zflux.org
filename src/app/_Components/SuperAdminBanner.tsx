'use client'
import { redirect } from "next/navigation"


export function SuperAdminBanner({ session }:any) {
  if (!session?.user?.user.is_super_admin) return null
  return (
    <div className='bg-amber-500 z-50 text-black px-4 py-2 flex justify-between'>
      <span>Super Admin As a company</span>
      <button onClick={()=>redirect('/superadmin')}>Return to Admin Panel</button>
    </div>
  )
}
