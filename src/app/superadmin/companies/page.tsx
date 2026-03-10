'use client'

import { DataTable } from '../../_Components/data-table'
import { columns } from './columns'
import { Companies } from '@/interfaces/company'
import {  useQuery } from '@tanstack/react-query'
import AddCompany from './_Components/AddCompany'

export default function Page() {

  const { data, isLoading } = useQuery<Companies>({
    queryKey: ['companies'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/companies')
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
              <AddCompany></AddCompany>
              <DataTable columns={columns} data={data!.data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
