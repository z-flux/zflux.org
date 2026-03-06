'use server'

import GetAuthToken from "@/GetAuthToken"
import { ProductScheme } from "@/schemas/productSchema"


export async function createProduct({data}:{data:ProductScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/products`,{
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