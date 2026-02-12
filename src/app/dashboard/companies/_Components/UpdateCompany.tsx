'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import React, { useState } from 'react'
import { data, updateCompany } from '../_Actions/updateCompany'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { update, UpdateScheme } from '@/schemas/updatecompanySchema'
import { Company } from '@/interfaces/company';

export default function UpdateCompany({company}:{company:Company}) {
  const id = company.id
    const form = useForm<UpdateScheme>({
        resolver: zodResolver(update),
        defaultValues: {
          name: company.name,
          subscriptionPlan: company.subscription_plan,
          maxUsers: Number(company.max_users)
        },
      });
     
  const queryClient = useQueryClient()
  const {mutate,isPending} = useMutation({mutationFn:updateCompany,mutationKey:['companies'],onSuccess:(data)=>{
    console.log(data);
    
    queryClient.invalidateQueries({queryKey:['companies']})
  }})
     

     async function onSubmit(data:UpdateScheme){
        mutate({id,data})
       
     }

     
  return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
    <button><i className="cursor-pointer text-sm fa-solid fa-pen hover:text-yellow-400 transition duration-100"></i></button >
    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    
    <AlertDialogHeader>
      <AlertDialogTitle>Updating Company Data</AlertDialogTitle>
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
            name="subscriptionPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1' >subscriptionPlan:</FormLabel>
                <FormControl>
                  <Input type="text"
                    className="mb-2"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.subscriptionPlan && (
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
            name="maxUsers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1' >Maximum users:</FormLabel>
                <FormControl>
                  <Input
                  
                    className="mb-2"
                    placeholder=""
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                {form.formState.errors.maxUsers && (
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
      <AlertDialogAction type='submit'>{isPending?<i className='tinyLoaderColored'></i>: 'Update'}</AlertDialogAction>
    </AlertDialogFooter>
    </form>
        
      </Form>
  </AlertDialogContent>
</AlertDialog>
  )
}
