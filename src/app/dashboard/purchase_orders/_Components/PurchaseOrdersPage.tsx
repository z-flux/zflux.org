'use client'
import { Button } from '@/components/ui/button'
import { CircleAlert, CircleCheck, Clock, Clock1, Clock3, FileText } from 'lucide-react'
import React from 'react'
import InvoiceButtons from './InvoiceButtons'
import InvoicesTable from './InvoicesTable'
import { useQuery } from '@tanstack/react-query'
import { Invoices } from '@/interfaces/invoices'

export default function PurchaseOrdersPage() {
    const { data,isLoading } = useQuery<Invoices>({
    queryKey: ['invoices'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/invoices')
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
    <div>
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-2xl font-bold">Purchase Orders</h1>
                <p className='text-sm text-gray-400'>Manage stock orders from suppliers</p>
            </div>
            <InvoiceButtons/>   
        </div>
        <div className='flex items-center gap-4 my-4'>
            <div className="w-1/4 border rounded-xl p-4 flex items-center bg-gray-50 dark:bg-[#161616]">
            <div className="">
                <p className='font-semibold  text-gray-800 dark:text-gray-200'>Total POs</p>
                <p className='font-semibold text-2xl'>0</p>
            </div>
            <div className="border rounded-sm flex justify-center items-center h-12 w-1/4 ms-auto bg-gray-100 dark:bg-[#202020]">
                <FileText size={28} className='text-gray-800 dark:text-gray-300'></FileText>
            </div>
            </div>
            <div className="w-1/4 border rounded-xl p-4 flex items-center bg-gray-50 dark:bg-[#161616]">
            <div className="">
                <p className='font-semibold  text-gray-800 dark:text-gray-200'>Pending/Ordered</p>
                <p className='font-semibold text-2xl'>0</p>
            </div>
            <div className="border rounded-sm flex justify-center items-center h-12 w-1/4 ms-auto bg-gray-100 dark:bg-[#202020]">
                <Clock3 size={28} className='text-blue-400'></Clock3>
            </div>
            </div>
            <div className="w-1/4 border rounded-xl p-4 flex items-center bg-gray-50 dark:bg-[#161616]">
            <div className="">
                <p className='font-semibold  text-gray-800 dark:text-gray-200'>Partially Recieved</p>
                <p className='font-semibold text-2xl'>0</p>
            </div>
            <div className="border rounded-sm flex justify-center items-center h-12 w-1/4 ms-auto bg-gray-100 dark:bg-[#202020]">
                <CircleAlert size={28} className='text-yellow-500'></CircleAlert>
            </div>
            </div>
            <div className="w-1/4 border rounded-xl p-4 flex items-center bg-gray-50 dark:bg-[#161616]">
            <div className="">
                <p className='font-semibold  text-gray-800 dark:text-gray-200'>Fully Recieved</p>
                <p className='font-semibold text-2xl'>0</p>
            </div>
            <div className="border rounded-sm flex justify-center items-center h-12 w-1/4 ms-auto bg-gray-100 dark:bg-[#202020]">
                <CircleCheck size={28} className='text-green-400'></CircleCheck>
            </div>
            </div>
        </div>
        <InvoicesTable data={data}/>
    </div>
  )
}
