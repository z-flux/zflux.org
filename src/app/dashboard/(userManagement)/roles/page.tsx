'use client'



import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../companies/data-table'
import { Roles } from '@/interfaces/role'
import { columns } from './columns'
import CreateRole from './_Components/CreateRole'






export default function Page() {
const fetchRoles = async () => {
  const res = await fetch('/api/dashboard/roles')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}
  const { data, isLoading } = useQuery<Roles>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
   
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
                    <CreateRole></CreateRole>
                  </div>
                  
                  </div>
                  <DataTable columns={columns} data={data!.data} />
                  </>
        )}
      </div>
    </div>
  )
}
