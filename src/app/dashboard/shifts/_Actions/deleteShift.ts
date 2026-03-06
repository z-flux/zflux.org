'use server'

import GetAuthToken from "@/GetAuthToken"

export async function deleteShift({id}:{id:number}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/shifts/${id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json'
        }
    })
    const payload = await res.json()
    return payload
}