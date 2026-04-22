'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Invoice } from '@/interfaces/invoices'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleCheckBig, MoreHorizontal, MoreVertical, PenBox, X } from 'lucide-react'
import React from 'react'
import { cancelPO } from '../_Actions/cancelPO'
import { markAsOrdered } from '../_Actions/markAsOrdered'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export default function InvoiceActionsDropDown({invoice}:{invoice:Invoice}) {
    const id = invoice.id
    const queryClient = useQueryClient()
    const {mutate:cancel} = useMutation({mutationFn:cancelPO,mutationKey:['invoices']})
    const {mutate:ordered} = useMutation({mutationFn:markAsOrdered,mutationKey:['invoices']})
    function cancelInvoice(){
        cancel({id},{onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:['invoices']})
            toast(res.message,{position:'top-right',duration:3000})
        }})
    }
    function markOrdered(){
        ordered({id},{onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:['invoices']})
            toast(res.message,{position:'top-right',duration:3000})
        }})
    }
  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={markOrdered}>
             <CircleCheckBig /> Mark As Ordered
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> redirect(`/dashboard/purchase_orders/purchase_order/${id}`)}><PenBox/> Update PO</DropdownMenuItem>
            <DropdownMenuItem onClick={cancelInvoice}><X/> Cancel PO</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}
