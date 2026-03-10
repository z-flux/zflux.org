'use client'

import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../_Components/data-table'
import { columns } from './columns'
import { Products } from '@/interfaces/products'
import { Shifts } from '@/interfaces/shifts'
import AddShift from './_Components/AddShift'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'


export default function Page() {

  const { data, isLoading } = useQuery<Shifts>({
    queryKey: ['shifts'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/shifts')
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
              {can("create_shifts")&&
                <AddShift></AddShift>}
              {can("view_shifts")?
              <DataTable columns={columns} data={data!.data} />:
              <Unauthorized/>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}