'use client'
import React, { useState } from 'react'
import StocksTable from './StocksTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PurchaseStockForm from './PurchaseStockForm'
import WasteStockForm from './WasteStockForm'

export default function StockPage() {
    

  const [type,setType] = useState("purchase")
  

    
  return (
    <div className='w-full flex flex-col lg:flex-row gap-6 mt-6'>
        <div className='w-full  lg:w-2/3'>
        <StocksTable ></StocksTable>
        </div>
        <div className='w-full  lg:w-1/3 bg-gray-50 dark:bg-[#171717] border rounded-2xl flex flex-col gap-6 p-4 px-5'>
        <h1 className='text-black dark:text-white text-xl font-bold'>
            <i className='fa-solid fa-plus'></i> Update Stock
        </h1>
        <Tabs defaultValue="purchase" onValueChange={(e)=>setType(e)} className="w-full" >
  <TabsList className='w-full '>
    <TabsTrigger value="purchase" >Purchase</TabsTrigger>
    <TabsTrigger value="waste" >Waste</TabsTrigger>
  </TabsList>
  <TabsContent value='purchase'><PurchaseStockForm/></TabsContent>
  <TabsContent value='waste'><WasteStockForm/></TabsContent>
  </Tabs>
        </div>
    </div>
  )
}
