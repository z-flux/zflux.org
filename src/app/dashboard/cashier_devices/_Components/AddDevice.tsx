'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Branches } from '@/interfaces/branch'
import { device, DeviceScheme } from '@/schemas/deviceSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createDevice } from '../_Actions/createDevice'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useQRCode } from 'next-qrcode'
import { TriangleAlert } from 'lucide-react'
export default function AddDevice({isVisible,setIsVisible}:{isVisible:boolean,setIsVisible:(val:boolean)=>void}) {
    
    const {SVG} = useQRCode()
    const [open,setOpen] = useState(false)
    const [responseData, setResponseData] = useState<any>(null);
    const form = useForm<DeviceScheme>({
        resolver:zodResolver(device),
        defaultValues:{
            name:"",
            branch_id:"",
            identifier:"",
            is_active:true
        }
    })
    const queryClient = useQueryClient()
    const { data } = useQuery<Branches>({
        queryKey: ['branches'],
        queryFn: async () => {
        const res = await fetch('/api/dashboard/branches')
        const payload = await res.json()
        return payload
    }})
    const {mutate} = useMutation({mutationFn:createDevice,mutationKey:['devices']})
    function handleSubmit(data:DeviceScheme){
        mutate({data},{onSuccess:(res)=>{
            toast(res.message,{position:'top-right',duration:3000})
            queryClient.invalidateQueries({queryKey:['devices']})
            form.reset()
            setResponseData(res)
            setOpen(true)
        }})
    }
  return (
    
        <div className={`bg-gray-50 dark:bg-[#171717] p-8 rounded-2xl ${isVisible ? "" : "hidden"}`}>
            <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold">Register New Device</h1>
                    <i onClick={()=>setIsVisible(false)}  className="fa-solid fa-xmark text-sm text-gray-800 dark:text-gray-400 cursor-pointer"></i>
                  </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='flex gap-4 items-center'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem className='w-1/3'>
                        <FormLabel className='mb-1'>Device Name</FormLabel>
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
          <FormItem className="w-1/3">
            <FormLabel className='mb-1'>Branch</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
                <SelectTrigger className="w-full mb-2">
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
                    <FormField
                        control={form.control}
                        name="identifier"
                        render={({ field }) => (
                        <FormItem className='w-1/3'>
                        <FormLabel className='mb-1'>Device Identifier</FormLabel>
                        <FormControl>
                        <Input className='mb-2 ' {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <div className="flex w-full">
                        <Button type='submit' className='ms-auto mt-4'>Register Device</Button>
                    </div>
                    
                </form>
            </Form>
            <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-yellow-500 flex items-center gap-2'><TriangleAlert size={40}/> <p> Note: You won't be able to reach this token once you close this Pop Up</p></DialogTitle>
          </DialogHeader>

          <div className='mx-auto'>
          <SVG
            text={`${responseData?.data.token}`}
            options={{
            margin: 1,
            width: 200,
            color: {
            dark: '#000000',
            light: '#FFFFFF',
            },}}
        />
        </div>
          <Button onClick={() => setOpen(false)} className='rounded-lg text-lg font-semibold w-20 ml-auto'>Close</Button>
        </DialogContent>
      </Dialog>
        </div>
  )
}
