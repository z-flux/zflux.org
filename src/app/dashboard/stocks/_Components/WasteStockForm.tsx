import { Branches } from '@/interfaces/branch'
import { Items } from '@/interfaces/items'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { stock_waste, StockWasteScheme } from '@/schemas/StockWasteSchema'
import { deductStock } from '../_Actions/deductStock'
import toast from 'react-hot-toast'

export default function WasteStockForm() {

    const form = useForm<StockWasteScheme>({
        resolver:zodResolver(stock_waste),
        defaultValues:{
            branch_id:"",
            item_id:"",
            quantity:0,
            reference_type:"",
            reference_id:"",
            notes:""
        }
    })
    const queryClient = useQueryClient()
        const { data, isLoading } = useQuery<Branches>({
    queryKey: ['branches'],
    queryFn: async () => {
        const res = await fetch('/api/dashboard/branches')
        const payload = await res.json()
        return payload
    },
})
    const { data:ingredients } = useQuery<Items>({
    queryKey: ['items'],
    queryFn: async () => {
        const res = await fetch('/api/dashboard/items')
        const payload = await res.json()
        return payload
    },
})  
const {mutate:Deduct} = useMutation({mutationKey:['stocks'],mutationFn:deductStock})
function handleSubmit(data:StockWasteScheme){
    Deduct({ data }, {
      onSuccess: (res) => {queryClient.invalidateQueries({ queryKey: ['stocks'] })
      toast(res.message,{position:'top-right',duration:3000})
}})
form.reset()
}
  return (
    <div><Form {...form}>
    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
        control={form.control}
        name="branch_id"
        render={({ field }) => (
          <FormItem className="">
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
          {data?.data.map((branch)=> <SelectItem key={branch.id} value={`${branch.id}`}>{branch.name}</SelectItem>)}
        
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
        name="item_id"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className='mb-1'>Ingredient</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an Ingredient" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ingredients</SelectLabel>
          {ingredients?.data.data.map((ingredient)=> <SelectItem key={ingredient.id} value={`${ingredient.id}`}>{ingredient.name}</SelectItem>)}
        
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
        name="quantity"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Quantity (in base unit)</FormLabel>
            <FormControl>
              <Input className='mb-2 '  {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="reference_type"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Reference Type</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reference_id"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Reference Id (optional)</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
     <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Note (optional)</FormLabel>
            <FormControl>
              <Textarea className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <Button type="submit" className='w-full py-4 text-lg rounded-lg font-semibold bg-red-600 hover:bg-red-500'  >Record Waste</Button>
    </form>
  </Form></div>
  )
}
