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
import { updateCategory } from '../_Actions/updateCategory'
import { Category } from '@/interfaces/categories'

export default function UpdateCategory({chosenCategory}:{chosenCategory:Category}) {
    const id = chosenCategory.id
    const form = useForm<CategoryScheme>({
  resolver: zodResolver(category),
  defaultValues: {
    company_id:chosenCategory.company_id,
    name: chosenCategory.name,
    description:chosenCategory.description,
    is_active:chosenCategory.is_active
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate} =useMutation({mutationFn:updateCategory,mutationKey:['categories']})

const onSubmit = (data: CategoryScheme) => {
 
  mutate({ id,data },{onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['categories'] })
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
      <AlertDialogTitle>Update Category</AlertDialogTitle>
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
  <Button type='submit'>Update</Button>
</AlertDialogFooter>
  </form>
</Form>
</AlertDialogContent>
</AlertDialog>
  )
}
