'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation';
import { Subcategories } from '@/interfaces/subcategory'
import { staff, StaffScheme } from '@/schemas/staffSchema'
import { Branches } from '@/interfaces/branch'
import toast from 'react-hot-toast'
import { updateStaff } from '../../../_Actions/updateStaff'
import { StaffMember } from '@/interfaces/staffMember'

export default function UpdateStaff({chosenStaff}:{chosenStaff:StaffMember}) {
    const id = chosenStaff.data.id
    const form = useForm<StaffScheme>({
  resolver: zodResolver(staff),
  defaultValues: {
    name:chosenStaff.data.name,
    branch_id:chosenStaff.data.branch_id.toString(),
    email:chosenStaff.data.email,
    phone:chosenStaff.data.phone,
    password:"",
    pin_code:"",
    username:chosenStaff.data.username,
    is_active:chosenStaff.data.is_active
  },
})
  const queryClient = useQueryClient()
      const { data } = useQuery<Branches>({
    queryKey: ['branches'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/branches')
  const payload = await res.json()
  return payload
},
  })

  const {mutate} = useMutation({mutationKey:['staff'],mutationFn:updateStaff})
const onSubmit = (data: StaffScheme) => {
 mutate({id,data},{onSuccess:(res)=>{queryClient.invalidateQueries({queryKey:['staff']})
 toast(res.message,{duration:3000,position:'top-right'})

}})

}

  return (
    <div className="bg-gray-50 dark:bg-[#171717] p-8 rounded-2xl ">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Update Staff</h1>
        <i onClick={()=>redirect("/dashboard/staff")} className="fa-solid fa-xmark text-sm text-gray-800 dark:text-gray-400 cursor-pointer"></i>
      </div>
       <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="">

    <div className='flex w-full gap-6 items-center'>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Name</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="branch_id"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className='mb-1'>Branch</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Branches</SelectLabel>
          {data?.data.map((branch)=> <SelectItem key={branch.id} value={`${branch.id}`}>{branch.name}</SelectItem>)}
        
        </SelectGroup>
      </SelectContent>
    </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <hr className="text-gray-600 my-8"/>
      
     <div className='flex w-full gap-6 items-center'>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Email</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Phone</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
       <hr className="text-gray-600 my-8"/>
      
     <div className='flex w-full gap-6 items-center'>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Password</FormLabel>
            <FormControl>
              <Input type='password' className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pin_code"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Pin Code</FormLabel>
            <FormControl>
              <Input type='password' className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <hr className="text-gray-600 my-8"/>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Username</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <div className='w-full flex'>
      <Button type='submit' className='w-1/3 font-semibold text-lg mt-4 ml-auto rounded-lg'>Update Staff</Button>
    </div>
    
  </form>
</Form>
    </div>
  )
}
