'use client'
import { IngredientPicker } from '@/app/dashboard/_Components/IngredientPicker'
import { Item, Items } from '@/interfaces/items'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function ItemsTable() {
            const { data } = useQuery<Items>({
          queryKey: ['items'],
          queryFn: async () => {
        const res = await fetch('/api/dashboard/items')
        const payload = await res.json()
        return payload
      },
        })
        const [selectedItems,setSelectedItems] = useState<Item[]>([])
       function onSelect(item:Item){
        setSelectedItems(prev => [...prev,item])
       }
  return (
    <div className="relative overflow-auto min-w-full bg-gray-50 dark:bg-[#171717] shadow-xs rounded-2xl border ">
      <div className='p-10'>
        <IngredientPicker data={data} onSelect={onSelect}/>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base ">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
             Item Name
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
               SKU
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
              Qty Recieved
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
              Unit Cost
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
               Total
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.length > 0 ? <>
            {selectedItems?.map((item)=>(
                <tr key={item.id} className="bg-neutral-primary border-b ">
                  <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
              {item.name}
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
              {item.sku}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {item.min_stock_level}
            </td>
            
          </tr>
            ))}
          </>:
          <>
          <tr className='text-center my-auto h-40 '>
            <td colSpan={5}>No items</td>
          </tr>
          </>}
          
        </tbody>
      </table>
    </div>
  )
}
