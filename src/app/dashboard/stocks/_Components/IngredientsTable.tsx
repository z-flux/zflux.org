import { Items } from '@/interfaces/items'
import { Stocks } from '@/interfaces/stocks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import UpdateIngredient from './UpdateIngredient'
import PopUpMessage from './PopUpMessage'

export default function IngredientsTable() {
        const { data } = useQuery<Items>({
      queryKey: ['items'],
      queryFn: async () => {
    const res = await fetch('/api/dashboard/items')
    const payload = await res.json()
    return payload
  },
    })
  return (
   

<div className="relative overflow-auto min-w-full bg-gray-50 dark:bg-[#171717] shadow-xs rounded-2xl border ">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base ">
      <tr>
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
          Name
        </th>
        
        
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
           Unit
        </th>
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
          Min Stock
        </th>
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
        {data?.data.data.map((item)=>(
            <tr key={item.id} className="bg-neutral-primary border-b ">
              <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
          {item.name}
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          {item.base_unit.symbol}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.min_stock_level}
        </td>
        <td className="px-6 py-4 flex gap-4 whitespace-nowrap">
          <UpdateIngredient chosenIngredient={item}/>
          <PopUpMessage id={item.id}/>
        </td>
      </tr>
        ))}
      
      
    </tbody>
  </table>
</div>


  )
}
