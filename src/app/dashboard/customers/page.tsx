'use client'

import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../_Components/data-table'
import { columns } from './columns'
import { Customers } from '@/interfaces/customers'
import AddCustomer from './_Components/AddCustomer'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'


export default function Page() {

  const { data, isLoading } = useQuery<Customers>({
    queryKey: ['customers'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/customers')
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
              {can("create_customers")&&
              <AddCustomer></AddCustomer>}
              {can("view_customers")?
              <DataTable columns={columns} data={data!.data.data} />:
              <Unauthorized/>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}