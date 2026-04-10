'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { Categories } from '@/interfaces/categories'
import { useFieldArray, useForm } from 'react-hook-form'
import { product, ProductScheme } from '@/schemas/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AddProduct() {
  const ingredients = [{id:1,name:"coffee beans"},{id:2,name:"milk"},{id:3,name:"cocoa powder"},]
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
      const { data } = useQuery<Categories>({
    queryKey: ['categories'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/categories')
  const payload = await res.json()
  return payload
},
  })
    const form = useForm<ProductScheme>({
  resolver: zodResolver(product),
  defaultValues: {
    category_id:"",
    name: "",
    variants:[{
      name:"",
      price:"",
      recipe:undefined
    }],
  },
})
const onSubmit = (data: ProductScheme) => {
 console.log(data);
}
const {fields:variants, append, remove}= useFieldArray({
  control:form.control,
  name:`variants`
})

function addVariant(){
  append({
    name:"",
    price:"",
  })
}

  return (
    <div className="bg-[#171717] p-8 rounded-2xl">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <i onClick={()=>redirect("/dashboard/products")} className="fa-solid fa-xmark text-sm text-gray-400 cursor-pointer"></i>
      </div>
       <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="">

    <div className='flex w-full gap-6 items-center'>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Product Name</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className='mb-1'>Category</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {data?.data.map((category)=> <SelectItem key={category.id} value={`${category.id}`}>{category.name}</SelectItem>)}
        
        </SelectGroup>
      </SelectContent>
    </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <hr className="text-gray-600 my-8"/>
      
    <div className="flex w-full gap-6">
        <div className='w-1/5'>
        <div className="flex w-full justify-between items-center">
          <h2 className='font-bold'>Variants</h2>
          <i onClick={addVariant} className='fa-solid fa-plus text-gray-300 text-sm cursor-pointer'></i>
        </div>
        {variants.map((variant,index)=>(
          <div key={variant.id} className='flex gap-2 items-center mt-2'>
            <Button type='button' variant={`${selectedVariantIndex==index?"default":"secondary"}`} onClick={()=>setSelectedVariantIndex(index)} className='w-full'>Variant {index+1}</Button>
            <i onClick={()=>remove(index)} className='fa-regular fa-trash-can text-sm text-red-600 cursor-pointer z-10'></i>
          </div>
        ))}
        </div>
        <div className='w-4/5 ml-4 p-6 bg-[#1d1d1d] rounded-xl'>
        <div className='flex w-full gap-6 items-center'>
      <FormField
        control={form.control}
        name={`variants.${selectedVariantIndex}.name`}
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Variant Name</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`variants.${selectedVariantIndex}.price`}
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Price</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
        </div>
    </div>


  </form>
</Form>
    </div>
  )
}
