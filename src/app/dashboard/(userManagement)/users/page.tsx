'use client'



import {  useQuery } from '@tanstack/react-query'
import { DataTable } from '../../../_Components/data-table'
import { columns } from './columns'
import { Users } from '@/interfaces/user'
import AddUser from './_Components/AddUser'







export default function Page() {
const fetchUsers = async () => {
  const res = await fetch('/api/dashboard/users')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}
  const { data, isLoading } = useQuery<Users>({
    queryKey: ['users'],
    queryFn: fetchUsers,
   
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
                  <AddUser></AddUser>
                  <DataTable columns={columns} data={data!.data} />
                </div>
              </>
            )}
          </div>
        </div>
  )
}
