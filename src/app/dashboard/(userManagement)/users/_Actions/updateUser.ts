'use server'

import { AuthOptions } from '@/authOptions'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import GetAuthToken from "@/GetAuthToken"
import { UpdateUserScheme } from "@/schemas/updateuserSchema"

interface data{
name:string,
salary:number,
status:string
}

export async function updateUser({id,data}:{id:number,data:data}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const session = await getServerSession(AuthOptions)
    const isSuperAdmin=session?.user?.user.is_super_admin
    const companyId = (await cookies()).get("company-id")?.value
    const headers: HeadersInit = {
            Authorization:`Bearer ${token}`,
            accept:'application/json',
            'content-Type':'application/json'
        }

    if (isSuperAdmin && companyId) {
        headers["X-Company-id"] = companyId.toString()
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/users/${id}`,{
        method:'PUT',
        headers:headers,
        body:JSON.stringify(data)
    })
    const payload = await res.json()
    return payload
}