'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState, useTransition } from 'react'
import { deleteUser } from '../_Actions/deleteUser'



export default function PopUpMessage({id}:{id:number}) {
  const [isPending, startTransition] = useTransition()
  const [open,setOpen]=useState(false)
//   const queryClient= useQueryClient()
//        const {mutate,isPending} = useMutation({
//   mutationFn: deleteUser,
// })
//   function handleDelete({id}:{id:number}){
//     mutate({id:id},{onSuccess:()=>{
//       queryClient.invalidateQueries({queryKey:['users']})
//       setOpen(false)
//     }})
    
//   }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <button  ><i className="cursor-pointer text-sm  fa-regular fa-trash-can hover:text-red-600 transition duration-100"></i></button>
    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this User
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() =>
    startTransition(async () => {
      await deleteUser({ id })
      setOpen(false)
    })
  }>{isPending?<i className='tinyLoaderColored'></i>: 'Continue'}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
