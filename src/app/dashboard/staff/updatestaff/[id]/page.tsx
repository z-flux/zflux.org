'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { SingleProduct } from '@/interfaces/singleProduct'
import { useParams } from 'next/navigation'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'
import { StaffMember } from '@/interfaces/staffMember'
import UpdateStaff from './_Components/UpdateStaff'

export default function page() {
        const {id} = useParams()
        const { data,isLoading } = useQuery<StaffMember>({
        queryKey: ['staff',id],
        queryFn: async () => {
      const res = await fetch(`/api/dashboard/staff_member/${id}`)
      const payload = await res.json()
      return payload
    },
      })
      if(isLoading){
        return <div className="min-h-screen -mt-4 flex justify-center items-center">
                <span className="loader"></span>
              </div>
      }
  return (
    <div className='py-10 w-[95%] mx-auto'><UpdateStaff chosenStaff={data!}/></div>
  )
}
