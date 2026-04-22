import { Staff } from '@/interfaces/staff'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { activateStaff } from '../_Actions/activateStaff'
import { deactivateStaff } from '../_Actions/deactivateStaff'
import { Switch } from '@/components/ui/switch'

export default function ToggleStaffActivation({chosenStaff}:{chosenStaff:Staff}) {
        const queryClient = useQueryClient()
    const {mutate:activate} = useMutation({mutationFn:activateStaff,mutationKey:['staff']})
    const {mutate:deactivate} = useMutation({mutationFn:deactivateStaff,mutationKey:['staff']})
    function toggleActivation(isActive:boolean,id:number){
        if(isActive == true){
        deactivate({id},{onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['staff']}) 
        }})            
        }else if(isActive == false){
            activate({id},{onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['staff']}) 
        }}) 
        }
    }
  return (
    <div><Switch checked={chosenStaff.is_active} onCheckedChange={()=>toggleActivation(chosenStaff.is_active,chosenStaff.id)}/></div>
  )
}
