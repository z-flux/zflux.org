import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import GetCompanies from '@/APIs/Dashboard/getCompanies'
import { Companies } from '@/interfaces/company'

export default async function page() {
  const data:Companies = await GetCompanies()
  
  return (
    <div className='min-h-screen '>
    <div className="w-[90%] mx-auto py-10">
      <DataTable columns={columns} data={data.data} />
    </div>
    </div>
  )
}
