'use server'

import { AuthOptions } from '@/authOptions'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import GetAuthToken from "@/GetAuthToken"
import { UserSchema } from "@/schemas/userSchema"

export async function createUser({Cdata}:{Cdata:UserSchema}){
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
    const apiPayload = {
  ...Cdata,
  settings: Object.fromEntries(Cdata.settings.map(s => [s.key, s.value])),
}
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/users`,{
        method:'POST',
        headers:headers,
        body:JSON.stringify(apiPayload)
    })
    const payload = await res.json()
    return payload
}