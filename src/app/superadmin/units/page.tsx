'use client'

import { Units } from '@/interfaces/units'
import { DataTable } from '../../_Components/data-table'
import { columns } from './columns'
import {  useQuery } from '@tanstack/react-query'
import AddUnit from './_Components/AddUnit'

export default function Page() {

  const { data, isLoading } = useQuery<Units>({
    queryKey: ['units'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/units')
  const payload = await res.json()
  return payload
},
  })

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
              <AddUnit></AddUnit>
              <DataTable columns={columns} data={data!} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
