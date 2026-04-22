'use client'
import { SingleInvoice } from '@/interfaces/invoice'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import UpdatePO from '../_Components/UpdatePO'

export default function page() {
    const {id} = useParams()
    const { data, isLoading } = useQuery<SingleInvoice>({
        queryKey: ['invoices',id],
        queryFn: async () => {
      const res = await fetch(`/api/dashboard/invoice/${id}`)
      const payload = await res.json()
      return payload
    },refetchOnMount:'always',
      })
   if(isLoading){
         return <div className="min-h-screen -mt-4 flex justify-center items-center">
                 <span className="loader"></span>
               </div>
       }
   return (
     <div className='py-10 w-[95%] mx-auto'><UpdatePO po={data!}/></div>
   )
}
