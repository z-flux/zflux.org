'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { update, UpdateScheme } from '@/schemas/updatecompanySchema'
import { updateUser } from '../_Actions/updateUser';
import { User } from '@/interfaces/user';
import { updateUsers, UpdateUserScheme } from '@/schemas/updateuserSchema';

export default function UpdateUser({user}:{user:User}) {
  const id = user.id
  const [open,setOpen]=useState(false)
    const form = useForm<UpdateUserScheme>({
        resolver: zodResolver(updateUsers),
        defaultValues: {
          name: user.name,
          salary:Number(user.salary).toFixed(2),
          status:user.status

        },
      });
     
  const queryClient = useQueryClient()
  const {mutate,isPending} = useMutation({mutationFn:updateUser,mutationKey:['users'],onSuccess:(data)=>{
    console.log(data);
    
    queryClient.invalidateQueries({queryKey:['users']})
  }})
     

     async function onSubmit(data:UpdateUserScheme){
        const ready = {...data,salary:parseFloat(data.salary)}
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
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1' >Salary:</FormLabel>
                <FormControl>
                  <Input type="text"
                    className="mb-2"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.salary && (
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
