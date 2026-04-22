import { Button } from '@/components/ui/button'
import { Invoices } from '@/interfaces/invoices'
import React from 'react'
import InvoiceActionsDropDown from './InvoiceActionsDropDown'
import { redirect } from 'next/navigation'
import { MoreHorizontal, MoreVertical } from 'lucide-react'

export default function InvoicesTable({data}:{data:Invoices | undefined}) {
  return (
    <div className="relative overflow-auto min-w-full bg-gray-50 dark:bg-[#171717] shadow-xs rounded-2xl border ">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base ">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                 PO Number
                </th>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                   Supplier
                </th>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                   Total Cost
                </th>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                   Expected Date
                </th>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                   Status
                </th>
                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                   Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data &&  data?.data?.length > 0 ? <>
                {data?.data.map((invoice)=>(
                    <tr key={invoice.id} className="bg-neutral-primary border-b ">
                <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  {invoice.po_number}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.supplier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.purchase_order_items.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.expected_at ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                  <Button variant={'default'} onClick={()=> window.location.href = `/dashboard/purchase_orders/${invoice.id}`}>view</Button> {invoice.status == 'draft' ? <InvoiceActionsDropDown invoice={invoice}/> :<Button variant="ghost" disabled className="h-8 w-8 p-0"><MoreHorizontal className='h-4 w-4'/></Button> }
                </td>
              </tr>
                ))}
              </>:
              <>
              <tr className='text-center my-auto h-40 '>
                <td colSpan={8}>No items</td>
              </tr>
              </>}
              
            </tbody>
          </table>
        </div>
  )
}
