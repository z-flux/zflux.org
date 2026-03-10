'use client'

import {  useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import { DataTable } from '../../_Components/data-table'
import { Branches } from '@/interfaces/branch'
import AddBranch from './_Components/AddBranch'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'


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
  const{can} = usePermission()

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
                  {can("create_branches")&&
                  <AddBranch></AddBranch>}
                  {can("view_branches")?
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
