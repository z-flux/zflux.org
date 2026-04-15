'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertDialog,  AlertDialogCancel, AlertDialogContent,  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unit, UnitScheme } from '@/schemas/unitSchema'
import toast from 'react-hot-toast'
import { Unit } from '@/interfaces/units'
import { updateUnit } from '../_Actions/updateUnit'


export default function UpdateUnit({chosenUnit}:{chosenUnit:Unit}) {

    const form = useForm<UnitScheme>({
  resolver: zodResolver(unit),
  defaultValues: {
    name:chosenUnit.name,
    type:chosenUnit.type,
    symbol:chosenUnit.symbol
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate} =useMutation({mutationFn:updateUnit,mutationKey:['units']})

const onSubmit = (data: UnitScheme) => {
 
  mutate({ data,id:chosenUnit.id },{onSuccess:(res)=>{
    queryClient.invalidateQueries({ queryKey: ['units'] })
        setOpen(false)
        toast(res.message,{position:'top-right',duration:3000})
  }})
form.reset()
}


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
        <button><i className="cursor-pointer text-sm fa-solid fa-pen hover:text-yellow-400 transition duration-100"></i></button >        
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    
    <AlertDialogHeader>
      <AlertDialogTitle>Update Unit</AlertDialogTitle>
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
        name="type"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Type</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="symbol"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Symbol</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
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
