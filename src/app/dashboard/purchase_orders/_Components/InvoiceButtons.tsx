'use client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React from 'react'

export default function InvoiceButtons() {
  return (
    <div className='flex gap-2'>
        <Button onClick={()=>redirect('/dashboard/purchase_orders/purchase_order')} className='rounded-lg text-lg font-semibold px-4 py-6' variant={'secondary'}><i className='fa-solid fa-plus'></i> New Purchase Order</Button>
        <Button onClick={()=>redirect('/dashboard/purchase_orders/direct_invoice')} className='rounded-lg text-lg font-semibold px-4 py-6' variant={'default'}><i className='fa-solid fa-plus'></i> Add Direct Invoice</Button>
    </div> 
  )
}
