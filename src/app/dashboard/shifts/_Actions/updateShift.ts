'use server'

import GetAuthToken from "@/GetAuthToken"
import { ShiftScheme } from "@/schemas/shiftSchema"

export async function updateShift({id,data}:{id:number,data:ShiftScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/shifts/${id}`,{
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