'use client'

import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../_Components/data-table'
import { columns } from './columns'
import { Products } from '@/interfaces/products'
import AddProduct from './_Components/AddProduct'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'


export default function Page() {

  const { data, isLoading } = useQuery<Products>({
    queryKey: ['products'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/products')
  const payload = await res.json()
  return payload
},
  })
  const {can} = usePermission()

  return (
    
    <div className="min-h-screen">
      
      <div className="w-[90%] mx-auto py-10">
        
        {isLoading ? (
          <div className="min-h-screen -mt-4 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            <div className="w-full">
              {can("create_products")&&
              <AddProduct></AddProduct>}
              {can("view_products")?
              <DataTable columns={columns} data={data!.data} />:
              <Unauthorized/>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}