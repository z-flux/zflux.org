'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userSchema, UserSchema } from '@/schemas/userSchema'
import { createUser } from '../_Actions/createUser'


export default function AddUser() {
    const form = useForm<UserSchema>({
  resolver: zodResolver(userSchema) ,
  defaultValues: {
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    company_id: 1,
    branch_id: 1,
    status: "active",
    hire_date: "",
    salary:0 ,
    settings: [{ key: "", value: '' }],
    
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate,data:m} =useMutation({mutationFn:createUser,mutationKey:['users'],onSuccess:()=>{
  queryClient.invalidateQueries({queryKey:['users']})
}})

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "settings",
})
console.log(form.formState.errors);

const onSubmit = (data: UserSchema) => {
  console.log("SUBMIT FIRED")
  mutate({ Cdata: data },{onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['users'] })
        setOpen(false)
  }})
  console.log(m);
  
  console.log(data)
}


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
<Button variant="outline" className="ml-auto">
              Add New <i className="fa-solid fa-plus text-xs"></i>
            </Button>    
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    
    <AlertDialogHeader>
      <AlertDialogTitle>Create User</AlertDialogTitle>
        </AlertDialogHeader>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="">

    {/* Basic Info */}
    <ScrollArea className="h-72 w-full rounded-md border p-3">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Name</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Email</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Phone</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Password</FormLabel>
            <FormControl>
              <Input type='password' className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password_confirmation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Confirm Password</FormLabel>
            <FormControl>
              <Input type='password' className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      <FormField
        control={form.control}
        name="company_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Company Id</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
   <FormField
        control={form.control}
        name="branch_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Branch Id</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      

      <FormField
        control={form.control}
        name="hire_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Hire Date</FormLabel>
            <FormControl>
              <Input type='date' className='mb-2'
               
               {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      

      <FormField
        control={form.control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Salary</FormLabel>
            <FormControl>
              <Input className='mb-2'  {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


    <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Status</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    {/* Dynamic Settings */}
    <div className="">
      <h3 className="text-lg font-semibold">Settings</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-end  ">
<div className='flex-1'>
          <FormField
            control={form.control}
            name={`settings.${index}.key`}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Setting Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`settings.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <Label>Setting Value</Label>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
              </FormItem>
            )}
          />
</div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className='mt-4 mb-2'
        onClick={() => append({ key: "", value: "" })}
      >
        + Add Setting
      </Button>
    </div>

</ScrollArea>

<AlertDialogFooter className='mt-4'>
  <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
  <Button type='submit'>Create</Button>
</AlertDialogFooter>
  </form>
</Form>
</AlertDialogContent>
</AlertDialog>
  )
}
