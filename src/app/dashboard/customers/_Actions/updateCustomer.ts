'use server'

import { AuthOptions } from '@/authOptions'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'
import { getCookie } from 'cookies-next'
import GetAuthToken from "@/GetAuthToken"
import { CustomerScheme } from "@/schemas/customerSchema"

export async function updateCustomer({id,data}:{id:number,data:CustomerScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const session = await getServerSession(AuthOptions)
    const isSuperAdmin=session?.user?.user.is_super_admin
    const companyId = await getCookie("company-id")
    const headers: HeadersInit = {
            Authorization:`Bearer ${token}`,
            accept:'application/json',
            'Content-Type':'application/json'
        }

    if (isSuperAdmin && companyId) {
        headers["X-Company-id"] = companyId.toString()
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/customers/${id}`,{
        method:'PUT',
        headers:headers,
        body:JSON.stringify(data)
    })
    const payload = await res.json()
    return payload
}