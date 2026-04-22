'use client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'


export default function AddStaffBtn() {

  return (
      <Button variant="outline" className="ml-auto" onClick={()=>redirect("/dashboard/staff/addstaff")}>
          Add New <i className="fa-solid fa-plus text-xs"></i>
      </Button>
  )
}
