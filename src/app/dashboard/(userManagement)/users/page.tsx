'use client'



import {  useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import { Users } from '@/interfaces/user'
import AddUser from './_Components/AddUser'
import { DataTable } from '@/app/_Components/data-table'
import { usePermission } from '@/hooks/usePermission'
import Unauthorized from '@/app/_Components/Unauthorized'







export default function Page() {

  const { data, isLoading } = useQuery<Users>({
    queryKey: ['users'],
    queryFn: async () => {
  const res = await fetch('/api/dashboard/users')
 const payload = await res.json()
  return payload
},
   
  })
  const {can} = usePermission()
console.log(data);

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
                  {can("create_users")&&
                  <AddUser></AddUser>}
                  {can("view_users")?
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
