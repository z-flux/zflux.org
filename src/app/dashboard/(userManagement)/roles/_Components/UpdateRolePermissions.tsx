'use client'
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RolePermissions } from '@/interfaces/rolePermissions'
import { Role } from '@/interfaces/role'
import { Input } from '@/components/ui/input'
import { Permissions } from '@/interfaces/permission'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { updateRole } from '../_Actions/updateRole'

export default function UpdateRolePermissions({role}:{role:Role}) {
    const [open, setOpen] = useState(false)
    const [word,setWord] = useState('')
    const [selected, setSelected] = useState<string[]>([])
const fetchPermissions = async () => {
  const res = await fetch('/api/dashboard/permissions')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}
  const { data, isLoading } = useQuery<Permissions>({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
   
  })
const { data:d } = useQuery<RolePermissions>({
  queryKey: ['rolePermissions',role.id],
  enabled: open,
  queryFn: async () => {
    const res = await fetch(`/api/dashboard/role/${role.id}`)
    const payload= await res.json()
    return payload
  }
})
 useEffect(() => {
  if (d?.data.permissions) {
    setSelected(d.data.permissions)
  }
}, [d])
const queryClient = useQueryClient()
  const {mutate,isPending} = useMutation({mutationFn:updateRole,mutationKey:['rolePermissions'],onSuccess:(data)=>{
    
    
    queryClient.invalidateQueries({queryKey:['rolePermissions']})
  }})
    
    
    
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <button><i className="cursor-pointer text-sm fa-solid fa-pen hover:text-yellow-400 transition duration-100"></i></button >
    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50 w-md'>
    <AlertDialogHeader>
      <AlertDialogTitle>Role Permissions for {role.name} </AlertDialogTitle>
      <AlertDialogDescription>
      </AlertDialogDescription>
      <Input
          placeholder="Search.."
          className="max-w-sm"
          onChange={(e)=>setWord(e.target.value)}
        />
    </AlertDialogHeader>
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        {isLoading?<p>Loading...</p>:<>
        {data?.data.map((per) => (
            per.name.toLowerCase().includes(word.toLowerCase())&&
          <React.Fragment key={per.id}>
            <div className='flex items-center gap-4  '>
                <Checkbox
  id={`${per.id}`}
  checked={selected.includes(per.name)}
  onCheckedChange={(checked) => {
    if (checked) {
      setSelected(prev => [...prev, per.name])
    } else {
      setSelected(prev => prev.filter(p => p !== per.name))
    }
  }}
/>
            <Label className='text-lg' htmlFor={`${per.id}`} >{per.name}</Label>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}</>}
      </div>
    </ScrollArea>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => {
    if (d?.data.permissions) {
      setSelected(d.data.permissions)
    }
  }}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{mutate({id:role.id,data:{name:role.name,permissions:selected}})}}>Update</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}