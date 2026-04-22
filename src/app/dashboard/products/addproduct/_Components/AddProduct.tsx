'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { product, ProductScheme } from '@/schemas/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Item, Items } from '@/interfaces/items'
import { IngredientPicker } from '../../../_Components/IngredientPicker'
import { createProduct } from '../../_Actions/createProduct'
import { redirect } from 'next/navigation';
import { Subcategories } from '@/interfaces/subcategory'

export default function AddProduct() {

    const form = useForm<ProductScheme>({
  resolver: zodResolver(product),
  defaultValues: {
    subcategory_id:"",
    name: "",
    variants:[{
      sku:"",
      variant_name:"",
      selling_price:"",
      ingredients:[]
    }],
  },
})
  const queryClient = useQueryClient()
      const { data } = useQuery<Subcategories>({
    queryKey: ['subcategories'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/subcategories')
  const payload = await res.json()
  return payload
},
  })
        const { data:items } = useQuery<Items>({
    queryKey: ['items'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/items')
  const payload = await res.json()
  return payload
},
  })
  const {mutate} = useMutation({mutationKey:['products'],mutationFn:createProduct})
const onSubmit = (data: ProductScheme) => {
 mutate({data},{onSuccess:()=>(queryClient.invalidateQueries({queryKey:['products']})
)})
form.reset()
}
const {fields:variants, append, remove}= useFieldArray({
  control:form.control,
  name:`variants`
})
const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
const selectedVariantIndex = variants.findIndex(
  v => v.id === selectedVariantId
)
const allVariants = form.watch("variants");
const currentIngredients = allVariants[selectedVariantIndex]?.ingredients ?? [];
function addVariant(){
  append({
    sku:"",
    variant_name:"",
    selling_price:"",
    ingredients:[]
  })
}
function deleteVariant(index:number){
  if(variants.length > 1){
    const idToDelete = variants[index].id

  remove(index)

  if (selectedVariantId === idToDelete) {
    const next = variants[index + 1] || variants[index - 1]
    setSelectedVariantId(next?.id)
  }
  }
}
function onSelect(item: Item) {
  if (!currentIngredients.some((i) => i.item_id === item.id.toString())) {
    const updated = [
      ...currentIngredients,
      {
        item_id: item.id.toString(),
        quantity: 0,
        unit_id: item.base_unit_id.toString(),
      },
    ];
    form.setValue(`variants.${selectedVariantIndex}.ingredients`, updated, {
      shouldValidate: true,
    });
  }
}
function removeIng(index: number) {
  const updated = currentIngredients.filter((_, i) => i !== index);
  form.setValue(`variants.${selectedVariantIndex}.ingredients`, updated, {
    shouldValidate: true,
  });
}
  return (
    <div className="bg-gray-50 dark:bg-[#171717] p-8 rounded-2xl ">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <i onClick={()=>redirect("/dashboard/products")} className="fa-solid fa-xmark text-sm text-gray-800 dark:text-gray-400 cursor-pointer"></i>
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
        name="subcategory_id"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className='mb-1'>SubCategory</FormLabel>
            <FormControl>
               <Select 
               onValueChange={field.onChange}
               value={field.value}
               >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a subcategory" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>SubCategories</SelectLabel>
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
          <i onClick={addVariant} className='fa-solid fa-plus text-gray-800 dark:text-gray-400 text-sm cursor-pointer'></i>
        </div>
        {variants.map((variant,index)=>(
          <div key={variant.id} className='flex gap-2 items-center mt-2'>
            <Button type='button' variant={`${selectedVariantIndex==index?"default":"secondary"}`} onClick={() => setSelectedVariantId(variant.id)} className='w-full'>Variant {index+1}</Button>
            <i onClick={()=>deleteVariant(index)} className='fa-regular fa-trash-can text-sm text-red-600 cursor-pointer z-10'></i>
          </div>
        ))}
        </div>
        <div className='w-4/5 ml-4 p-6 bg-gray-100 dark:bg-[#1d1d1d] rounded-xl'>
        <div className='flex  w-full gap-4 items-center'>
      <FormField
        control={form.control}
        name={`variants.${selectedVariantIndex}.variant_name`}
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
        name={`variants.${selectedVariantIndex}.selling_price`}
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>Selling Price</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`variants.${selectedVariantIndex}.sku`}
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormLabel className='mb-1'>SKU</FormLabel>
            <FormControl>
              <Input className='mb-2 ' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className='flex w-full gap-4 mt-4'>
      <div className='w-1/2'>
    <IngredientPicker data={items} onSelect={onSelect}/>
    </div>
    <div className='w-1/2 border rounded-lg p-5 flex flex-col gap-2 min-h-40'>
    {currentIngredients.length>0 ?<>{currentIngredients.map((ingredient,index)=>(
      
          <div key={ingredient.item_id} className='border rounded-md flex items-center py-2 px-4 justify-between'>
            <p className='font-semibold me-2'>{items?.data.data.find((i)=>i.id.toString()==ingredient.item_id)?.name}</p>
            <div className='flex items-center gap-2'>
            <FormField
        control={form.control}
        name={`variants.${selectedVariantIndex}.ingredients.${index}.quantity`}
        render={({ field }) => (
          <FormItem className='w-20'>
            <FormControl>
              <Input className=''  {...field} onChange={(e)=>field.onChange(Number(e.target.value))}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <i onClick={()=>removeIng(index)} className='fa-regular fa-trash-can text-sm text-red-600 cursor-pointer z-10'></i>
          </div>
          </div>
        ))}</>
        : <>
        <p className='text-center my-auto text-mist-400'>No ingredients yet</p>
        </>}
    </div>
    </div>
    
        </div>
        
    </div>
    <div className='w-full flex'>
      <Button type='submit' className='w-1/3 font-semibold text-lg mt-4 ml-auto rounded-lg'>Create Product</Button>
    </div>
    
  </form>
</Form>
    </div>
  )
}
