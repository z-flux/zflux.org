'use client'



import {  useQuery } from '@tanstack/react-query'

import { Roles } from '@/interfaces/role'
import { columns } from './columns'
import CreateRole from './_Components/CreateRole'
import { DataTable } from '@/app/_Components/data-table'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'






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
  const{can}= usePermission()


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
                  {can("create_roles")&&
                  <CreateRole></CreateRole>
                  }
                  {can("view_roles")?
                  <DataTable columns={columns} data={data!.data} />:
                  <Unauthorized/>
                  }
                </div>
              </>
            )}
          </div>
        </div>
  )
}
