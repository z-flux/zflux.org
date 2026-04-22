'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ingredient, IngredientScheme } from '@/schemas/ingredientSchema'
import { Units } from '@/interfaces/units'
import { AlertDialog,  AlertDialogCancel, AlertDialogContent,  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import toast from 'react-hot-toast'
import { addIngredient } from '../stocks/_Actions/addIngredient'
import { useState } from 'react'
import { Plus } from 'lucide-react'
export default function AddIngredientPopUp() {
    const [open, setOpen] = useState(false)
    const form = useForm<IngredientScheme>({
        resolver:zodResolver(ingredient),
        defaultValues:{
            name:"",
            sku:"",
            cost_price:0,
            base_unit_id:"",
            purchase_unit_id:"",
            min_stock_level:0,
            max_stock_level:0
        }
    })
    const { data, isLoading } = useQuery<Units>({
    queryKey: ['units'],
    queryFn: async () => {
        const res = await fetch('/api/dashboard/units')
        const payload = await res.json()
        return payload
    },
})
    const {mutate} = useMutation({mutationKey:['items'],mutationFn:addIngredient})
  const queryClient = useQueryClient()

    function handleSubmit(data:IngredientScheme){
        mutate({data},{onSuccess:(res)=>{
          queryClient.invalidateQueries({queryKey:['items']})
        toast(res.message,{position:'top-right',duration:3000})
        setOpen(false)
        }})
        form.reset()
        
    }    
  return (
        <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
        <Button className='font-semibold text-lg bg-green-600 hover:bg-green-500 w-[90%] mx-auto rounded-lg text-white'><Plus/> Add New Ingredient</Button>     
  </AlertDialogTrigger>
  <AlertDialogContent className='z-50'>
    
    <AlertDialogHeader>
      <AlertDialogTitle>Create Ingredient</AlertDialogTitle>
        </AlertDialogHeader>
    <Form {...form}>
  <form onSubmit={(e) => { e.stopPropagation(); form.handleSubmit(handleSubmit)(e); }} className="">

    <ScrollArea className="h-72 w-full rounded-md border p-3">
            <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Name</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>SKU</FormLabel>
            <FormControl>
              <Input className='mb-2' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cost_price"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Cost Price</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="base_unit_id"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className='mb-1'>Base Unit</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Units</SelectLabel>
          {data?.map((unit)=> <SelectItem key={unit.id} value={`${unit.id}`}>{unit.name}</SelectItem>)}
        
        </SelectGroup>
      </SelectContent>
    </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="purchase_unit_id"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className='mb-1'>Purchase Unit</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Units</SelectLabel>
          {data?.map((unit)=> <SelectItem key={unit.id} value={`${unit.id}`}>{unit.name}</SelectItem>)}
        
        </SelectGroup>
      </SelectContent>
    </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="min_stock_level"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Min Stock Level</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="max_stock_level"
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='mb-1'>Max Stock Level</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
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
