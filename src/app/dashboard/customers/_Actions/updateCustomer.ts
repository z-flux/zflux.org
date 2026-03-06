'use server'

import GetAuthToken from "@/GetAuthToken"
import { CustomerScheme } from "@/schemas/customerSchema"

export async function updateCustomer({id,data}:{id:number,data:CustomerScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/customers/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const payload = await res.json()
    return payload
}