'use client'
import React from 'react'
import UpdateProduct from '../_Components/UpdateProduct'
import { useQuery } from '@tanstack/react-query'
import { SingleProduct } from '@/interfaces/singleProduct'
import { useParams } from 'next/navigation'

export default function page() {
        const {id} = useParams()
        const { data:prod,isLoading } = useQuery<SingleProduct>({
        queryKey: ['product'],
        queryFn: async () => {
      const res = await fetch(`/api/dashboard/product/${id}`)
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
    <div className='py-10 w-[95%] mx-auto'><UpdateProduct prod={prod!}></UpdateProduct></div>
  )
}
