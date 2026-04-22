import { Switch } from '@/components/ui/switch'
import { Customer } from '@/interfaces/customers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toggleStatus } from '../_Actions/toggleStatus'

export default function ToggleActivation({chosenCustomer}:{chosenCustomer:Customer}) {
    const queryClient = useQueryClient()
    const {mutate} = useMutation({mutationFn:toggleStatus,mutationKey:['customers']})
    function toggleActivation(id:number){
        mutate({id},{onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['customers']}) 
        }}) 
    }
  return (
    <div><Switch checked={chosenCustomer.is_active} onCheckedChange={()=>toggleActivation(chosenCustomer.id)}/></div>
  )
}
