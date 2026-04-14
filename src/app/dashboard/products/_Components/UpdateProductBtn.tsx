'use client'

import { Product } from '@/interfaces/products'
import { redirect } from 'next/navigation'



export default function UpdateProductBtn({chosenProduct}:{chosenProduct:Product}) {

  return (

   <button onClick={()=>redirect(`/dashboard/products/updateproduct/${chosenProduct.id}`)}>
    <i className="cursor-pointer text-sm fa-solid fa-pen hover:text-yellow-400 transition duration-100"></i>
    </button >     
  
  )
}
