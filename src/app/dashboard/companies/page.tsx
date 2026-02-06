'use client'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'

import { Companies } from '@/interfaces/company'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default  function page() {
  const queryClient = useQueryClient()
  const {data,isLoading} = useQuery<Companies>({queryKey:['companies'],queryFn:async()=>{
    const res = await fetch('/api/dashboard/companies')
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED')
      }
      throw new Error('FETCH_FAILED')
    }
    return res.json()
  }})
  queryClient.invalidateQueries({queryKey:['companies']})
  
  
  
  
  return (
    <div className='min-h-screen '>
    <div className="w-[90%] mx-auto py-10 ">
      {isLoading?<div className='min-h-screen -mt-4 flex justify-center items-center'>
        <span className='loader'></span>
      </div>:
      <DataTable columns={columns} data={data!.data} />}
    </div>
    </div>
  )
}
