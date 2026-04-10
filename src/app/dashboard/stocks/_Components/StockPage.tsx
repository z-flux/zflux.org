'use client'
import React, { useState } from 'react'
import StocksTable from './StocksTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { stock, StockScheme } from '@/schemas/updateStockSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Branches } from '@/interfaces/branch'
import { Input } from '@/components/ui/input'
import { Items } from '@/interfaces/items'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { addStock } from '../_Actions/addStock'
import { deductStock } from '../_Actions/deductStock'

export default function StockPage() {
    const form = useForm<StockScheme>({
        resolver:zodResolver(stock),
        defaultValues:{
            branch_id:"",
            item_id:"",
            quantity:0
        }
    })
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
  const [type,setType] = useState("purchase")
  const queryClient = useQueryClient()
  const {mutate:Add} = useMutation({mutationKey:['stocks'],mutationFn:addStock})
  const {mutate:Deduct} = useMutation({mutationKey:['stocks'],mutationFn:deductStock})
    function handleSubmit(data:StockScheme){
        if (type === 'purchase') {
    Add({ data }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stocks'] })
    })
  } else {
    Deduct({ data }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stocks'] })
    })
  }
    }
    
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
  
  <Form {...form}>
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
              <Input className='mb-2 ' type='number' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="note"
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
      <TabsContent value="purchase"><Button type="submit" className='w-full py-4 text-lg rounded-lg font-semibold' >Record Purchase</Button></TabsContent>
    <TabsContent value="waste"><Button type="submit" className='w-full py-4 text-lg rounded-lg font-semibold bg-red-600 hover:bg-red-500'  >Record Waste</Button></TabsContent>
    </form>
  </Form>
  </Tabs>
        </div>
    </div>
  )
}
