'use client'
import { Devices } from '@/interfaces/device'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import DisplayDevices from './_Components/DisplayDevices'
import AddDevice from './_Components/AddDevice'
import { Button } from '@/components/ui/button'

export default function page() {
        const [isVisible,setIsVisible] = useState(false)
        const { data,isLoading } = useQuery<Devices>({
        queryKey: ['devices'],
        queryFn: async () => {
        const res = await fetch('/api/dashboard/devices')
        const payload = await res.json()
        return payload
    }})
  return (
    <div className="min-h-screen">
          
          <div className="w-[90%] mx-auto py-10">
            
            {isLoading ? (
              <div className="min-h-screen -mt-4 flex justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                <div className="w-full">
                    <div>
                        <div className="flex justify-between items-start my-6">
                        <h1 className="text-2xl font-bold">Cashier Devices</h1>
                        <Button onClick={()=>{setIsVisible(true) 
                            console.log(isVisible)}}>Add New Device</Button>
                        </div>
                        <AddDevice isVisible={isVisible} setIsVisible={setIsVisible}/>
                    </div>
                  <DisplayDevices devices={data!}/>
                </div>
              </>
            )}
          </div>
        </div>
  )
}
