'use client'
import { AlertDialog,  AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import  { useState } from 'react'
import { deleteSubcategory } from '../_Actions/deleteSubcategory'


export default function PopUpMessage({id}:{id:number}) {
  const [open,setOpen]=useState(false)
  const queryClient= useQueryClient()
       const {mutate,isPending} = useMutation({
  mutationFn: deleteSubcategory,
})
  function handleDelete({id}:{id:number}){
    mutate({id:id},{onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['subcategories']})
      setOpen(false)
    }})

  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <button  ><i className="cursor-pointer text-sm  fa-regular fa-trash-can hover:text-red-600 transition duration-100"></i></button>
    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this SubCategory
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button onClick={()=>{handleDelete({id})}}>{isPending?<i className='tinyLoaderColored'></i>: 'Continue'}</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
