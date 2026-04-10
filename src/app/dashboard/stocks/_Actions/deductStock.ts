'use server'

import { AuthOptions } from '@/authOptions'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import GetAuthToken from "@/GetAuthToken"
import { StockScheme } from '@/schemas/updateStockSchema'


export async function deductStock({data}:{data:StockScheme}){
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/inventory/deduct-stock`,{
        method:'POST',
        headers:headers,
        body:JSON.stringify(data)
    })
    const payload = await res.json()
    return payload
}