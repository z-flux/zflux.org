'use client'

import {  useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import { DataTable } from '../companies/data-table'
import { Branches } from '@/interfaces/branch'
import AddBranch from './_Components/AddBranch'


export default function Page() {
const fetchBranches = async () => {
  const res = await fetch('/api/dashboard/branches')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}
  const { data, isLoading } = useQuery<Branches>({
    queryKey: ['branches'],
    queryFn: fetchBranches,
   
  })


  return (
    <div className="min-h-screen">
      <div className="w-[90%] mx-auto py-10">
        {isLoading ? (
          <div className="min-h-screen -mt-4 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (<>
                <div className='w-full'>
                  <div className='w-1/9 ml-auto'>
                    <AddBranch></AddBranch>
                  </div>
                  
                  </div>
                  <DataTable columns={columns} data={data!.data} />
                  </>
        )}
      </div>
    </div>
  )
}
