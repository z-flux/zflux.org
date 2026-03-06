'use server'

import GetAuthToken from "@/GetAuthToken"
import { SubcategoryScheme } from "@/schemas/subcategory"


export async function createSubcategory({data}:{data:SubcategoryScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/subcategories`,{
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