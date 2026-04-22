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
import { createUnit } from '../_Actions/createUnit'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'


export default function AddUnit() {

    const form = useForm<UnitScheme>({
  resolver: zodResolver(unit),
  defaultValues: {
    name:"",
    type:"",
    symbol:""
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate} =useMutation({mutationFn:createUnit,mutationKey:['units']})

const onSubmit = (data: UnitScheme) => {
 
  mutate({ data },{onSuccess:(res)=>{
    queryClient.invalidateQueries({ queryKey: ['units'] })
        setOpen(false)
        toast(res.message,{position:'top-right',duration:3000})
  }})
form.reset()
}


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
            Add New <i className="fa-solid fa-plus text-xs"></i>
        </Button> 
    </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    
    <AlertDialogHeader>
      <AlertDialogTitle>Create Unit</AlertDialogTitle>
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
              <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Types</SelectLabel>
           <SelectItem  value={`weight`}>Weight</SelectItem>
        <SelectItem  value={`volume`}>Volume</SelectItem>
        <SelectItem  value={`piece`}>Piece</SelectItem>
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
  <Button type='submit'>Create</Button>
</AlertDialogFooter>
  </form>
</Form>
</AlertDialogContent>
</AlertDialog>
  )
}
