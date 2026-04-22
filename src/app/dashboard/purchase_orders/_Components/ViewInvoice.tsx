import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SingleInvoice } from '@/interfaces/invoice'
import { Items } from '@/interfaces/items'
import { receipt, ReceiptScheme } from '@/schemas/receiptSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { confirmReceipts } from '../_Actions/confirmReceipt'
import toast from 'react-hot-toast'

export default function ViewInvoice({invoice}:{invoice:SingleInvoice}) {
    const id = invoice.data.id
    const { data } = useQuery<Items>({
                queryKey: ['items'],
                queryFn: async () => {
              const res = await fetch('/api/dashboard/items')
              const payload = await res.json()
              return payload
            },
              })
    const form = useForm<ReceiptScheme>({
            resolver:zodResolver(receipt),
            defaultValues:{
                notes:"",
                items:invoice.data.purchase_order_items.map((item)=>({
                    purchase_order_item_id:item.item_id.toString(),
                    quantity_received:0,
                    unit_cost:item.unit_cost.toString()
                }))
            }
        })
        const queryClient = useQueryClient()
        const {mutate} = useMutation({mutationFn:confirmReceipts,mutationKey:['invoices']}) 
            function RowTotal({ control, index }: { control: any; index: number }) {
                const quantity = useWatch({ control, name: `items.${index}.quantity_received` })
                const unitCost = useWatch({ control, name: `items.${index}.unit_cost` })
        
                const total = (Number(quantity) || 0) * (parseFloat(unitCost) || 0)
        
                return <span>{total.toFixed(2)}</span>
        }
function TotalSum({ control }: { control: any }) {
  const items = useWatch({ control, name: 'items' })

  const total = items?.reduce((sum:number, item:any) => {
    return sum + (Number(item.quantity_received) || 0) * (parseFloat(item.unit_cost) || 0)
  }, 0) ?? 0

  return <span>${total.toFixed(2)}</span>
}
        function handleSubmit(data:ReceiptScheme){
               mutate({data,id},{onSuccess:(res)=>{toast(res.message,{position:'top-right',duration:3000})
        form.reset()
    }})
        }
  return (
    <div>
        <div className='flex gap-4 items-center mb-4'>
                <div className="border rounded-sm p-2 ">
                <ArrowLeft size={22} className='cursor-pointer' onClick={()=>redirect("/dashboard/purchase_orders")}/>
                </div>
                <div className='flex gap-2'>
                    <h1 className='font-bold text-2xl'>{invoice.data.po_number}</h1>
                    <Badge variant={'outline'} className=''>{invoice.data.status}</Badge>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-6 w-full'>
                    <div className='w-2/3 flex flex-col gap-6'>
                    
                    <div className="relative overflow-auto min-w-full bg-gray-50 dark:bg-[#171717] shadow-xs rounded-2xl border ">
                          <div className='p-4 flex items-center justify-between'>
                            <p className='text-gray-500 text-lg font-semibold'>Order Items</p>
                            <p className='text-gray-500 '>{invoice.data.purchase_order_items.length} items</p>
                          </div>
                          <hr/>
                          <table className="w-full text-sm text-left rtl:text-right text-body">
                            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base ">
                              <tr>
                                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                                 Item Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                                   Ordered
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                                   Received
                                </th>
                                {invoice.data.status == 'draft' &&
                                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                                   Receiving Now
                                </th>}
                                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                                  Unit Cost
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold text-black dark:text-gray-300">
                                   Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>

                                {invoice.data.purchase_order_items?.map((item,index)=>{
                                     const currentItem = data?.data.data.find((i)=> i.id == item.item_id)
                                    
                                  return  <tr key={item.id} className="bg-neutral-primary border-b ">
                                      <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                  {currentItem?.name}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.quantity_ordered}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.quantity_received}
                                </td>
                                {invoice.data.status == 'draft' &&
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <FormField
                            control={form.control}
                            name={`items.${index}.quantity_received`}
                            render={({ field }) => (
                              <FormItem className=''>
                                
                                <FormControl>
                                  <Input className=' ' {...field} onChange={(e)=>field.onChange(Number(e.target.value))}/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                                </td>}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.unit_cost}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {invoice.data.status == 'draft' ?
                                    <RowTotal control={form.control} index={index} />:
                                    <>
                                    {item.total_cost}
                                    </>
                                }
                                </td>
                              </tr>
})}
                              
                              
                            </tbody>
                          </table>
                        </div>
                    </div>
                    <div className="w-1/3 gap-4 flex flex-col">
                    <div className='border bg-gray-50 dark:bg-[#171717] px-6 py-4 rounded-lg'>
                        <p className='text-lg font-semibold'>Financial Summary</p>
                        <div className="flex justify-between my-2">
                            <p>subtotal</p>
                            {invoice.data.status == 'draft' ?
                                    <TotalSum control={form.control} />:
                                    <>
                                    {invoice.data.subtotal}
                                    </>
                                }
                        </div>
                        <div className="flex justify-between my-2">
                            <p>tax</p>
                            {invoice.data.tax}
                        </div>
                        <div className="flex justify-between my-2">
                            <p>discount</p>
                            {invoice.data.discount}
                        </div>
                        <hr/>
                        <div className="flex justify-between my-2 font-semibold text-lg">
                            <p className=''>total</p>
                            {invoice.data.status == 'draft' ?
                                    <TotalSum control={form.control} />:
                                    <>
                                    {invoice.data.total}
                                    </>
                                }
                        </div>
                    </div>
                    {invoice.data.status == 'draft' &&
                    <div className='border bg-gray-50 dark:bg-[#171717] px-4 py-4 rounded-lg'>
                         <FormField
                            control={form.control}
                            name={`notes`}
                            render={({ field }) => (
                              <FormItem className=''>
                                <FormLabel className='mb-1'>Recieving Notes</FormLabel>
                                <FormControl>
                                  <Textarea className='mb-2 ' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button className='font-semibold text-lg w-full bg-green-400 hover:bg-green-400 text-white mt-4'>Confirm Receipt</Button>
                    </div>}
                    {invoice.data.status == 'cancelled' &&
                    <div className='border bg-gray-50 dark:bg-[#171717] px-4 py-4 rounded-lg'>
                        <p className='text-gray-500 dark:text-gray-300  font-semibold'>Invoice Number</p>
                        <p className='text-gray-500 dark:text-gray-300'>{invoice.data.invoice_number}</p>
                    </div>
                    }
                    </div>
                </form>
            </Form>
        </div>
  )
}
