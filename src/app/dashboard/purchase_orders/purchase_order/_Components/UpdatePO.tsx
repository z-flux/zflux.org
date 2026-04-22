'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Suppliers } from '@/interfaces/suppliers'
import { Branches } from '@/interfaces/branch'
import { Textarea } from '@/components/ui/textarea'
import { Item, Items } from '@/interfaces/items'
import { IngredientPicker } from '@/app/dashboard/_Components/IngredientPicker'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { purchase_order, PurchaseOrderScheme } from '@/schemas/purchaseOrderSchema'
import { createPurchaseOrder } from '../../_Actions/createPurchaseOrder'
import { useState } from 'react'
import { SingleInvoice } from '@/interfaces/invoice'
import { updatePO } from '../../_Actions/updatePO'

export default function UpdatePO({po}:{po:SingleInvoice}) {
    const id = po.data.id
    const [status,setStatus] = useState('draft')
    const form = useForm<PurchaseOrderScheme>({
        resolver:zodResolver(purchase_order),
        defaultValues:{
            supplier_id:po.data.supplier_id.toString(),
            branch_id:po.data.branch_id.toString(),
            expected_at:new Date(`${po.data.expected_at}`).toLocaleDateString('en-CA'),
            mark_as_ordered:false,
            notes:po.data.notes?? "",
            items:po.data.purchase_order_items.map((item)=>({
                item_id:item.item_id.toString(),
                quantity_ordered:item.quantity_ordered,
                unit_cost:item.unit_cost
            }))
        }
    })
    const {fields:items, append, remove} = useFieldArray({
        control:form.control,
        name:`items`
    })
          const { data:suppliers } = useQuery<Suppliers>({
    queryKey: ['suppliers'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/suppliers')
  const payload = await res.json()
  return payload
},
  })
            const { data:branches } = useQuery<Branches>({
    queryKey: ['branches'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/branches')
  const payload = await res.json()
  return payload
},
  })
        const { data } = useQuery<Items>({
            queryKey: ['items'],
            queryFn: async () => {
          const res = await fetch('/api/dashboard/items')
          const payload = await res.json()
          return payload
        },
          })
          const queryClient = useQueryClient()
        const {mutate} = useMutation({mutationFn:updatePO,mutationKey:['invoices']})  
         function onSelect(item:Item){
            if(items.some((i)=>i.item_id== item.id.toString())) return;
          append({
            item_id:item.id.toString(),
            quantity_ordered:0,
            unit_cost:""
          })
          
         }
    function RowTotal({ control, index }: { control: any; index: number }) {
        const quantity = useWatch({ control, name: `items.${index}.quantity_ordered` })
        const unitCost = useWatch({ control, name: `items.${index}.unit_cost` })

        const total = (Number(quantity) || 0) * (parseFloat(unitCost) || 0)

        return <span>{total.toFixed(2)}</span>
}
function TotalSum({ control }: { control: any }) {
  const items = useWatch({ control, name: 'items' })

  const total = items?.reduce((sum:number, item:any) => {
    return sum + (Number(item.quantity_ordered) || 0) * (parseFloat(item.unit_cost) || 0)
  }, 0) ?? 0

  return <span>${total.toFixed(2)}</span>
}
    function handleSubmit(data:PurchaseOrderScheme){
        if(status == 'save'){
            const finalData = {...data,mark_as_ordered:true}
            mutate({id,data:finalData},{onSuccess:(res)=>{toast(res.message,{position:'top-right',duration:3000})
            queryClient.invalidateQueries({queryKey:['invoices']})
        
    }})
}else{
    const finalData = {...data,mark_as_ordered:false}
    mutate({id,data:finalData},{onSuccess:(res)=>{toast(res.message,{position:'top-right',duration:3000})
    queryClient.invalidateQueries({queryKey:['invoices']})
        
    }})
}

    }
  return (
    <div>
        <div className=''>
            <div className='flex gap-4 items-center mb-4'>
                <div className="border rounded-sm p-2 ">
                <ArrowLeft size={22} className='cursor-pointer' onClick={()=>redirect("/dashboard/purchase_orders")}/>
                </div>
                <div>
                    <h1 className='font-bold text-3xl'>Update Purchase Order</h1>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>Create a new stock request</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-6 w-full'>
                    <div className='w-2/3 flex flex-col gap-6'>
                    <div className=" bg-gray-50 dark:bg-[#171717] border p-4 rounded-2xl">
                    <div className='flex w-full gap-4 mb-2 items-center'>
      <FormField
        control={form.control}
        name="supplier_id"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className='mb-1'>Supplier</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a supplier" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suppliers</SelectLabel>
          {suppliers?.map((supplier)=> <SelectItem key={supplier.id} value={`${supplier.id}`}>{supplier.name}</SelectItem>)}
        
        </SelectGroup>
      </SelectContent>
    </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="branch_id"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className='mb-1'>Branch</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Branches</SelectLabel>
          {branches?.data.map((branch)=> <SelectItem key={branch.id} value={`${branch.id}`}>{branch.name}</SelectItem>)}
        
        </SelectGroup>
      </SelectContent>
    </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
                    </div>
                    <div className='flex w-full gap-4 mb-2 items-center'>
                          
                        <FormField
                            control={form.control}
                            name="expected_at"
                            render={({ field }) => (
                              <FormItem className='w-1/2'>
                                <FormLabel className='mb-1'>Expected Delivery Date</FormLabel>
                                <FormControl>
                                  <Input type='date' className='mb-2 ' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem className='w-1/2'>
                                <FormLabel className='mb-1'>Notes (optional)</FormLabel>
                                <FormControl>
                                  <Textarea className='mb-2 ' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                    </div>
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
                                  Qty Ordered
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
                              {items.length > 0 ? <>
                                {items?.map((item,index)=>{
                                    const currentItem = data?.data.data.find((i)=> i.id.toString() == item.item_id)
                                    
                                  return  <tr key={item.id} className="bg-neutral-primary border-b ">
                                      <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                  {currentItem?.name}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {currentItem?.sku}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <FormField
                            control={form.control}
                            name={`items.${index}.quantity_ordered`}
                            render={({ field }) => (
                              <FormItem className=''>
                                
                                <FormControl>
                                  <Input className=' ' {...field} onChange={(e)=>field.onChange(Number(e.target.value))}/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <FormField
                            control={form.control}
                            name={`items.${index}.unit_cost`}
                            render={({ field }) => (
                              <FormItem className=''>
                                
                                <FormControl>
                                  <Input className=' ' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <RowTotal control={form.control} index={index} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <X size={20} onClick={()=>remove(index)} className='hover:text-red-500 transition duration-150 cursor-pointer'/>
                                </td>
                              </tr>
})}
                              </>:
                              <>
                              <tr className='text-center my-auto h-40 '>
                                <td colSpan={5}>No items</td>
                              </tr>
                              </>}
                              
                            </tbody>
                          </table>
                        </div>
                    </div>
                    <div className="w-1/3 ">
                    <div className='border bg-gray-50 dark:bg-[#171717] px-6 py-4 rounded-lg'>
                        <p className='text-lg font-semibold'>Cost Summary</p>
                        <div className="flex justify-between my-2">
                            <p>subtotal</p>
                            <TotalSum control={form.control}/>
                        </div>
                        <hr/>
                        <div className="flex justify-between my-2 font-semibold text-lg">
                            <p className=''>total</p>
                            <TotalSum control={form.control}/>
                        </div>
                    </div>
                    <Button disabled={items.length <= 0 } variant={'default'} type='submit' onClick={()=>setStatus('save')} className='w-full mt-4 mb-2 text-lg font-semibold rounded-lg'>Save & Mark as Ordered</Button>
                    <Button disabled={items.length <= 0 } variant={'secondary'} type='submit' onClick={()=>setStatus('draft')} className='w-full mt-4 mb-2 text-lg font-semibold rounded-lg'>Save as Draft</Button>
                    </div>
                </form>
            </Form>
            
        </div>
    </div>
  )
}
