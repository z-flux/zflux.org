'use client'



import {  useQuery } from '@tanstack/react-query'
import { Permissions } from '@/interfaces/permission'
import { columns } from './columns'
import { DataTable } from '@/app/_Components/data-table'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'




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
          {can("view_permissions")?
          <DataTable columns={columns} data={data!.data} />:
          <Unauthorized/>
          }
          </>
        )}
      </div>
    </div>
  )
}
