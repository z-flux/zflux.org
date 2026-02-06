'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import React, { useState } from 'react'
import { data, updateCompany } from '../_Actions/updateCompany'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { update, UpdateScheme } from '@/schemas/updatecompanySchema'

export default function UpdateCompany({id}:{id:number}) {
    const form = useForm<UpdateScheme>({
        resolver: zodResolver(update),
        defaultValues: {
          name: '',
          subscriptionPlan: '',
          maxUsers: 0
        },
      });
      const [formData,setFormData]=useState<data>()
  const queryClient = useQueryClient()
  const {mutate,isPending,data:mutateData} = useMutation({mutationFn:updateCompany,mutationKey:['companies']})
     queryClient.invalidateQueries({queryKey:['companies']})

     async function onSubmit(data:UpdateScheme){
        setFormData(data)
     }
     console.log(mutateData);
     
  return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant={'ghost'}><i className="cursor-pointer text-lg fa-solid fa-pen text-yellow-400"></i></Button >
    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    <AlertDialogHeader>
      <AlertDialogTitle>Updating Company Data</AlertDialogTitle>
        <Form {...form}>
        <form className="w-full " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='' >Name:</FormLabel>
                <FormControl>
                  <Input
                  
                    className=""
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
                <FormLabel className='' >subscriptionPlan:</FormLabel>
                <FormControl>
                  <Input type="text"
                    className=""
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
                <FormLabel className='' >Maximum users:</FormLabel>
                <FormControl>
                  <Input
                  
                    className=" "
                    placeholder=""
                    {...field}
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
        
        </form>
        
      </Form>
      
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>mutate({id,data:formData!})}>{isPending?<i className='tinyLoaderColored'></i>: 'Update'}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
