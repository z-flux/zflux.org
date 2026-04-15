'use server'

import GetAuthToken from "@/GetAuthToken"
import { UnitScheme } from "@/schemas/unitSchema"

export async function createUnit({data}:{data:UnitScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/inventory/units`,{
        method:'POST',
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