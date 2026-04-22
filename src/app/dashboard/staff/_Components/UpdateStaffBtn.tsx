'use client'

import { Data } from '@/interfaces/staffMember'
import { redirect } from 'next/navigation'



export default function UpdateStaffBtn({chosenStaff}:{chosenStaff:Data}) {

  return (

   <button onClick={()=>redirect(`/dashboard/staff/updatestaff/${chosenStaff.id}`)}>
    <i className="cursor-pointer text-sm fa-solid fa-pen hover:text-yellow-400 transition duration-100"></i>
    </button >     
  
  )
}
