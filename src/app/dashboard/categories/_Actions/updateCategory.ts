'use server'

import GetAuthToken from "@/GetAuthToken"
import { CategoryScheme } from "@/schemas/categorySchema"

export async function updateCategory({id,data}:{id:number,data:CategoryScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/categories/${id}`,{
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