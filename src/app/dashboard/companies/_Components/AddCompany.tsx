'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { CompanyFormValues, companySchema } from '@/schemas/companySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCompany } from '../_Actions/createCompany'

export default function AddCompany() {
    const form = useForm<CompanyFormValues>({
  resolver: zodResolver(companySchema) as any,
  defaultValues: {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    tax_number: "",
    commercial_register: "",
    status: "active",
    subscription_plan: "basic",
    subscription_start:'' ,
    subscription_end: '',
    max_users: 1,
    max_branches: 0,
    multi_branch: false,
    currency: "USD",
    timezone: "UTC",
    language: "en",
    settings: [{ key: "", value: false }],
    notes: "",
  },
})
const [open, setOpen] = React.useState(false)
const queryClient = useQueryClient()
const {mutate,data:m} =useMutation({mutationFn:createCompany,mutationKey:['companies'],onSuccess:()=>{
  queryClient.invalidateQueries({queryKey:['companies']})
}})

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "settings",
})

const onSubmit = (data: CompanyFormValues) => {
  

  // TypeScript will infer payload.settings as Record<string, boolean>
  mutate({ Cdata: data },{onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['companies'] })
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
      <AlertDialogTitle>Create Company</AlertDialogTitle>
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
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Website</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tax_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Tax number</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="commercial_register"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Commercial Register</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
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

      <FormField
        control={form.control}
        name="subscription_plan"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Subscription Plan</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subscription_start"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Subscription Start</FormLabel>
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
        name="subscription_end"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Subscription End</FormLabel>
            <FormControl>
              <Input type='date' className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="max_users"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Max Users</FormLabel>
            <FormControl>
              <Input className='mb-2'  {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="max_branches"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Max Branches</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    {/* Multi Branch Switch */}
    <FormField
      control={form.control}
      name="multi_branch"
      render={({ field }) => (
        <FormItem className="flex items-center gap-4 my-2">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Multi Branch</FormLabel>
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
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Language</FormLabel>
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
              <FormItem className="flex-1 self-end">
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

    <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mb-1'>Notes (optional)</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
