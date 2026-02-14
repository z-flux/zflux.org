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
import { branchSchema, BranchSchema } from '@/schemas/branchSchema'
import { createBranch } from '../_Actions/createBranch'
import { Switch } from '@/components/ui/switch'


export default function AddBranch() {
    const form = useForm<BranchSchema>({
  resolver: zodResolver(branchSchema) ,
  defaultValues: {
    company_id: 0,
    name: "",
    code: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postal_code: 0,
    is_main: false,
    status: "",
    manager_name: "",
    manager_phone: "",
    opening_time: "",
    closing_time: "",
    timezone: "",
    currency: "",
    tax_rate: "",
    settings: [{ key: "", value: false }],
    
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate,data:m} =useMutation({mutationFn:createBranch,mutationKey:['branches'],onSuccess:()=>{
  queryClient.invalidateQueries({queryKey:['branches']})
}})

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "settings",
})
console.log(form.formState.errors);

const onSubmit = (data: BranchSchema) => {
  console.log("SUBMIT FIRED")
  mutate({ Cdata: data },{onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['branches'] })
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
      <AlertDialogTitle>Create Branch</AlertDialogTitle>
        </AlertDialogHeader>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="">

    {/* Basic Info */}
    <ScrollArea className="h-72 w-full rounded-md border p-3">

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
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Code</FormLabel>
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
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Address</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>City</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Country</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      
   <FormField
        control={form.control}
        name="postal_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Postal Code</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
      control={form.control}
      name="is_main"
      render={({ field }) => (
        <FormItem className="flex items-center gap-4 my-2">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Is Main</FormLabel>
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

      <FormField
        control={form.control}
        name="manager_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Manager Name</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="manager_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Manager Phone</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="opening_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Opening Time</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="closing_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Closing Time</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timezone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Timezone</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Currency</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tax_rate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Tax Rate</FormLabel>
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
          <FormField
            control={form.control}
            name={`settings.${index}.key`}
            render={({ field }) => (
              <FormItem className="flex-1">
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
                          <Label>value</Label>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

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
        onClick={() => append({ key: "", value: false })}
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
