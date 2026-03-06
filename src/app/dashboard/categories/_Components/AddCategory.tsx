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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { category, CategoryScheme } from '@/schemas/categorySchema'
import { createCategory } from '../_Actions/createCategory'

export default function AddCategory() {
    const form = useForm<CategoryScheme>({
  resolver: zodResolver(category),
  defaultValues: {
    company_id:1,
    name: "",
    description:"",
    is_active:true
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate} =useMutation({mutationFn:createCategory,mutationKey:['categories']})

const onSubmit = (data: CategoryScheme) => {
 
  mutate({ data },{onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['categories'] })
        setOpen(false)
  }})
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
      <AlertDialogTitle>Create Category</AlertDialogTitle>
        </AlertDialogHeader>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="">

    <ScrollArea className="h-72 w-full rounded-md border p-3">
      
      <FormField
        control={form.control}
        name="company_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Company Id</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} onChange={(e)=>field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Name</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Description</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <FormField
      control={form.control}
      name="is_active"
      render={({ field }) => (
        <FormItem className="flex items-center gap-4 my-2">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Is Active</FormLabel>
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
