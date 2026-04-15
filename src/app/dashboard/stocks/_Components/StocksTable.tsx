import { Stocks } from '@/interfaces/stocks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function StocksTable() {
        const { data } = useQuery<Stocks>({
      queryKey: ['stocks'],
      queryFn: async () => {
    const res = await fetch('/api/dashboard/stocks')
    const payload = await res.json()
    return payload
  },
    })
  return (
   

<div className="relative overflow-auto min-w-full  bg-gray-50 dark:bg-[#171717] shadow-xs rounded-2xl border ">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base ">
      <tr>
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
          Ingredient
        </th>
        
        
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
           Stock
        </th>
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
          Min Level
        </th>
        <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
          Branch
        </th>
      </tr>
    </thead>
    <tbody>
      {data?.data && data.data.length > 0 ? <>
      {data.data.map((item)=>(
            <tr key={item.id} className="bg-neutral-primary border-b ">
              <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
          {item.item.name}
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          {item.quantity_in_base_unit}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.min_stock_level}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.branch.name}
        </td>
      </tr>
        ))}
      </> : <>
      <tr className='text-center my-auto h-40 '>
        <td colSpan={4}>No items</td>
      </tr>
      </> }
      
    </tbody>
  </table>
</div>


  )
}
