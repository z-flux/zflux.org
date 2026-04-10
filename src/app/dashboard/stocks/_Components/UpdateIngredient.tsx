'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { AlertDialog,  AlertDialogCancel, AlertDialogContent,  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { shift, ShiftScheme } from '@/schemas/shiftSchema'
import { Shift } from '@/interfaces/shifts'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Branches } from '@/interfaces/branch'
import { ingredient, UpdateIngredientScheme } from '@/schemas/updateIngredientSchema'
import { Units } from '@/interfaces/units'
import { updateIngredient } from '../_Actions/updateIngredient'
import { Item } from '@/interfaces/items'


export default function UpdateIngredient({chosenIngredient}:{chosenIngredient:Item}) {
    const { data, isLoading } = useQuery<Units>({
    queryKey: ['units'],
    queryFn: async () => {
        const res = await fetch('/api/dashboard/units')
        const payload = await res.json()
        return payload
    },
})
    const id = chosenIngredient.id
    const form = useForm<UpdateIngredientScheme>({
  resolver: zodResolver(ingredient),
  defaultValues: {
    name:chosenIngredient.name,
    sku:chosenIngredient.sku,
    cost_price:Number( chosenIngredient.cost_price),
    purchase_unit_id:chosenIngredient.purchase_unit_id.toString(),
    min_stock_level:chosenIngredient.min_stock_level,
    max_stock_level:chosenIngredient.max_stock_level
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate} =useMutation({mutationFn:updateIngredient,mutationKey:['items']})

const onSubmit = (data: UpdateIngredientScheme) => {
 
  mutate({ id,data },{onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['items'] })
        setOpen(false)
  }})
}


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
        <button><i className="cursor-pointer text-sm fa-solid fa-pen hover:text-yellow-400 transition duration-100"></i></button >        
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    
    <AlertDialogHeader>
      <AlertDialogTitle>Update Ingredient</AlertDialogTitle>
        </AlertDialogHeader>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="">

    <ScrollArea className="h-72 w-full rounded-md border p-3">
      
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
    
</ScrollArea>

<AlertDialogFooter className='mt-4'>
  <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
  <Button type='submit'>Update</Button>
</AlertDialogFooter>
  </form>
</Form>
</AlertDialogContent>
</AlertDialog>
  )
}
