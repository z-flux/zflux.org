'use client'

import {  useQuery } from '@tanstack/react-query'
import { Stocks } from '@/interfaces/stocks'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'
import Inventory from './_Components/Inventory'


export default function Page() {

  const { data, isLoading } = useQuery<Stocks>({
    queryKey: ['stocks'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/stocks')
  const payload = await res.json()
  return payload
},
  })
  const {can} = usePermission()
  return (
    
    <div className="min-h-screen">
      
      <div className="w-[95%] mx-auto py-10">
        
        {isLoading ? (
          <div className="min-h-screen -mt-4 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            <div className="w-full">
              {can("view_stocks")?
              <Inventory></Inventory>:
              <Unauthorized/>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}