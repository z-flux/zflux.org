'use client'
import Unauthorized from '@/app/_Components/Unauthorized'
import { Button } from '@/components/ui/button'
import { usePermission } from '@/hooks/usePermission'
import React from 'react'
import PurchaseOrdersPage from './_Components/PurchaseOrdersPage'

export default function page() {
    const {can} = usePermission()
  return (<>
  <div className="min-h-screen">
      
      <div className="w-[95%] mx-auto py-10">
    {can("view_orders")?<>
    <PurchaseOrdersPage/>

    </>:<Unauthorized/>}
    </div>
    </div>
    </>
  )
}
