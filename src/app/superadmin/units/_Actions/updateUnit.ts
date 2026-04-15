'use server'

import GetAuthToken from "@/GetAuthToken"
import { UnitScheme } from "@/schemas/unitSchema"

export async function updateUnit({ id,data}:{data:UnitScheme,id:number}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/inventory/units/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json',
            'content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const payload = await res.json()
    return payload
}