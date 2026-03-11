'use server'

import { AuthOptions } from '@/authOptions'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'
import { getCookie } from 'cookies-next'
import GetAuthToken from "@/GetAuthToken"

export async function deleteUser({id}:{id:number}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const session = await getServerSession(AuthOptions)
    const isSuperAdmin=session?.user?.user.is_super_admin
    const companyId = await getCookie("company-id")
    const headers: HeadersInit = {
            Authorization:`Bearer ${token}`,
            accept:'application/json'
        }

    if (isSuperAdmin && companyId) {
        headers["X-Company-id"] = companyId.toString()
    }
    console.log("API:", process.env.NEXT_PUBLIC_API)
    console.log("Deleting ID:", id)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/users/${id}`,{
        method:'DELETE',
        headers:headers
    })
    const payload = await res.json()
    return payload
}