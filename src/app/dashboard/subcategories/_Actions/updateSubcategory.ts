'use server'

import GetAuthToken from "@/GetAuthToken"
import { SubcategoryScheme } from "@/schemas/subcategory"

export async function updateSubcategory({id,data}:{id:number,data:SubcategoryScheme}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/subcategories/${id}`,{
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