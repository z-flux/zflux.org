'use client'

import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../_Components/data-table'
import { columns } from './columns'
import { Customers } from '@/interfaces/customers'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'
import { StaffResponse } from '@/interfaces/staff'
import AddStaffBtn from './_Components/AddStaffBtn'


export default function Page() {

  const { data, isLoading } = useQuery<StaffResponse>({
    queryKey: ['staff'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/staff')
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
              {can("create_staff")&&
              <AddStaffBtn/>}
              {can("view_staff")?
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