'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUsers, UpdateUserScheme } from '@/schemas/updateuserSchema';
import { Branch } from '@/interfaces/branch';
import { updateBranch } from '../_Actions/updateBranch';
import { updateBranchScheme, UpdateBranchScheme } from '@/schemas/updateBranchSchema';

export default function UpdateBranch({branch}:{branch:Branch}) {
  const id = branch.id
  const [open,setOpen]=useState(false)
    const form = useForm<UpdateBranchScheme>({
        resolver: zodResolver(updateBranchScheme),
        defaultValues: {
          name: branch.name,
          tax_rate:Number(branch.tax_rate).toFixed(2),
          status:branch.status

        },
      });
     
  const queryClient = useQueryClient()
  const {mutate,isPending} = useMutation({mutationFn:updateBranch,mutationKey:['branches'],onSuccess:(data)=>{
    console.log(data);
    
    queryClient.invalidateQueries({queryKey:['branches']})
  }})
     

     async function onSubmit(data:UpdateBranchScheme){
        const ready = {...data,tax_rate:parseFloat(data.tax_rate)}
        console.log(ready);
        
        mutate({id,data:ready},{onSuccess:()=>{
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
      <AlertDialogTitle>Updating User Data</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
        <form className="w-[95%] mx-auto " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1' >Name:</FormLabel>
                <FormControl>
                  <Input
                  
                    className="mb-2"
                    placeholder=""
                    {...field}
                    
                  />
                </FormControl>
                {form.formState.errors.name && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-600 dark:text-red-400"
                    role="alert"
                  >
                    <FormMessage />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tax_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1' >Tax Rate:</FormLabel>
                <FormControl>
                  <Input type="text"
                    className="mb-2"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.tax_rate && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <FormMessage />
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1' >Status:</FormLabel>
                <FormControl>
                  <Input
                  
                    className="mb-2"
                    placeholder=""
                    {...field}
                    
                  />
                </FormControl>
                {form.formState.errors.status && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-600 dark:text-red-400"
                    role="alert"
                  >
                    <FormMessage />
                  </div>
                )}
              </FormItem>
            )}
          />
        
        
      
    
    <AlertDialogFooter className='mt-4'>
      <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
      <Button type='submit'>{isPending?<i className='tinyLoaderColored'></i>: 'Update'}</Button>
    </AlertDialogFooter>
    </form>
        
      </Form>
  </AlertDialogContent>
</AlertDialog>
  )
}
