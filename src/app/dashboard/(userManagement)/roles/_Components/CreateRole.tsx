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
import { createRole } from '../_Actions/createRole'
import { Button } from '@/components/ui/button'

export default function CreateRole() {
    const [open, setOpen] = useState(false)
    const [word,setWord] = useState('')
    const [role,setRole] = useState('')
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


const queryClient = useQueryClient()
  const {mutate,isPending} = useMutation({mutationFn:createRole,mutationKey:['roles'],onSuccess:(data)=>{
    console.log(data);
    
    setOpen(false)
    queryClient.invalidateQueries({queryKey:['roles']})
  }})
    
    
    
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button variant="outline" className="ml-auto">
              Add New <i className="fa-solid fa-plus text-xs"></i>
            </Button>
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50 w-md'>
    <AlertDialogHeader>
      <AlertDialogTitle>Add New Role</AlertDialogTitle>
      <AlertDialogDescription>
      </AlertDialogDescription>
      <Label htmlFor='role' className='mb-1'>Role Name</Label>
      <Input 
      placeholder="Role Name.."
      id='role'
          className="max-w-sm mb-2"
          onChange={(e)=>setRole(e.target.value)}
      />
      <Input
          placeholder="Search For Permissions.."
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
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button onClick={()=>{mutate({data:{name:role,permissions:selected}})}}>Create</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
