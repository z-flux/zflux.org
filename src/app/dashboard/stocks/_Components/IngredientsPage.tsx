'use client'
import React, { useState } from 'react'
import StocksTable from './StocksTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { stock, StockScheme } from '@/schemas/StockPurchaseSchema'
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
import { ingredient, IngredientScheme } from '@/schemas/ingredientSchema'
import { Units } from '@/interfaces/units'
import IngredientsTable from './IngredientsTable'
import { addIngredient } from '../_Actions/addIngredient'

export default function IngredientsPage() {
    const form = useForm<IngredientScheme>({
        resolver:zodResolver(ingredient),
        defaultValues:{
            name:"",
            sku:"",
            cost_price:0,
            base_unit_id:"",
            purchase_unit_id:"",
            min_stock_level:0,
            max_stock_level:0
        }
    })
    const { data, isLoading } = useQuery<Units>({
    queryKey: ['units'],
    queryFn: async () => {
        const res = await fetch('/api/dashboard/units')
        const payload = await res.json()
        return payload
    },
})
    const {mutate} = useMutation({mutationKey:['items'],mutationFn:addIngredient})
  const queryClient = useQueryClient()

    function handleSubmit(data:IngredientScheme){
        mutate({data},{onSuccess:()=>queryClient.invalidateQueries({queryKey:['items']})})
    }
    
  return (
    <div className='w-full flex flex-col lg:flex-row gap-6 mt-6'>
        <div className='w-full  lg:w-2/3'>
        <IngredientsTable></IngredientsTable>
        </div>
        <div className='w-full lg:w-1/3 bg-gray-50 dark:bg-[#171717] border rounded-2xl flex flex-col gap-6 p-4 px-5'>
        <h1 className='text-black dark:text-white text-xl font-bold'>
            <i className='fa-solid fa-plus'></i> Add Ingredient
        </h1>
  <Form {...form}>
    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Name</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>SKU</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cost_price"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Cost Price</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="base_unit_id"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className='mb-1'>Base Unit</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Units</SelectLabel>
          {data?.map((unit)=> <SelectItem key={unit.id} value={`${unit.id}`}>{unit.name}</SelectItem>)}
        
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
        name="purchase_unit_id"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className='mb-1'>Purchase Unit</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Units</SelectLabel>
          {data?.map((unit)=> <SelectItem key={unit.id} value={`${unit.id}`}>{unit.name}</SelectItem>)}
        
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
        name="min_stock_level"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Min Stock Level</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="max_stock_level"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Max Stock Level</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <Button className='w-full py-4 text-lg rounded-lg font-semibold'>Create Ingredient</Button>
    </form>
  </Form>
        </div>
    </div>
  )
}
