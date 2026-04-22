'use client'
import { Switch } from '@/components/ui/switch'
import { Devices } from '@/interfaces/device'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Tv2 } from 'lucide-react'
import React from 'react'
import { activateDevice } from '../_Actions/activateDevice'
import { deactivateDevice } from '../_Actions/deactivateDevice'

export default function DisplayDevices({devices}:{devices:Devices}) {
    const queryClient = useQueryClient()
    const {mutate:activate} = useMutation({mutationFn:activateDevice,mutationKey:['devices']})
    const {mutate:deactivate} = useMutation({mutationFn:deactivateDevice,mutationKey:['devices']})
    function toggleActivation(isActive:boolean,id:number){
        if(isActive == true){
        deactivate({id},{onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['devices']}) 
        }})            
        }else if(isActive == false){
            activate({id},{onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['devices']}) 
        }}) 
        }
    }
  return (
    <div className='flex flex-wrap w-full mt-8'>{devices.data.map((device)=>(
        <div key={device.id} className='w-1/3 p-2'>
            <div className={`${device.is_active ==true ? "shadow-sm shadow-green-600 dark:shadow-green-500": "shadow-sm shadow-red-600 dark:shadow-red-500"} border bg-gray-100 dark:bg-[#171717] rounded-lg p-4`}>
            <div className='flex justify-between items-center mb-8'>
                <Tv2 size={35}/>
                <Switch checked={device.is_active} onCheckedChange={()=>toggleActivation(device.is_active,device.id)}/>
            </div>
            <p className='text-xl font-semibold'>{device.name}</p>
            <p className='text-gray-500 dark:text-gray-300'>{device.branch.name}</p>
            </div>
        </div>
    ))}</div>
  )
}
