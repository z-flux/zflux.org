'use client'
import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { User } from '@/interfaces/user'
import { SingleUsers } from '@/interfaces/singleUser'
export default function RolesPopUp({user}:{user:User}) {
    const [open, setOpen] = useState(false)
    const [word,setWord] = useState('')
const { data, isLoading } = useQuery<SingleUsers>({
  queryKey: ['userRoles',user.id],
  enabled: open,
  queryFn: async () => {
    const res = await fetch(`/api/dashboard/user/${user.id}`)
    const payload= await res.json()
    return payload
  }
})
    
    
    
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <button><i className="cursor-pointer text-sm  fa-regular fa-eye font-thin hover:text-green-600 transition duration-100"></i></button>
    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50 w-md'>
    <AlertDialogHeader>
      <AlertDialogTitle>Roles for {data?.data.name}</AlertDialogTitle>
      <AlertDialogDescription>
      </AlertDialogDescription>
      <Input
          placeholder="Search.."
          defaultValue={''}
          className="max-w-sm"
          onChange={(e)=>setWord(e.target.value)}
        />
    </AlertDialogHeader>
    <ScrollArea className="max-h-72 w-full rounded-md border">
      <div className="p-4">
        {isLoading?<p>Loading...</p>:<>
        {data?.data.roles.map((role,i) => (
            role.includes(word)&&
          <React.Fragment key={role}>
            <div className="font-normal">{role}</div>
            {i>1 && <Separator className="my-2" />}
            
          </React.Fragment>
        ))}</>}
      </div>
    </ScrollArea>
    <AlertDialogFooter>
      
      <AlertDialogAction >Done</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
