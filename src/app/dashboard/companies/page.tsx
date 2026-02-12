'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import { Companies } from '@/interfaces/company'
import {  useQuery } from '@tanstack/react-query'
import AddCompany from './_Components/AddCompany'




export default function Page() {
const fetchCompanies = async () => {
  const res = await fetch('/api/dashboard/companies')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}
  const { data, isLoading } = useQuery<Companies>({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
   
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
            <AddCompany ></AddCompany>
          </div>
          
          </div>
          <DataTable columns={columns} data={data!.data} />
          </>
        )}
      </div>
    </div>
  )
}
