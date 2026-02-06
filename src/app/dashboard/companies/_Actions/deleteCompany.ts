'use server'

import GetAuthToken from "@/GetAuthToken"

export async function deleteCompany({id}:{id:number}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.API}/dashboard/companies/${id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json'
        }
    })
    const payload = await res.json()
    return payload
}