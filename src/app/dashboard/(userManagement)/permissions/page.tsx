'use client'



import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../companies/data-table'
import { Permissions } from '@/interfaces/permission'
import { columns } from './columns'




export default function Page() {
const fetchPermissions = async () => {
  const res = await fetch('/api/dashboard/permissions')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}
  const { data, isLoading } = useQuery<Permissions>({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
   
  })


  return (
    <div className="min-h-screen">
      <div className="w-[90%] mx-auto py-10">
        {isLoading ? (
          <div className="min-h-screen -mt-4 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <DataTable columns={columns} data={data!.data} />
        )}
      </div>
    </div>
  )
}
