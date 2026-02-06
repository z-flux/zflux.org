'use server'

import GetAuthToken from "@/GetAuthToken"
import { json } from "zod"
export interface data{
    name: string,
    subscriptionPlan: string,
    maxUsers: number

}

export async function updateCompany({id,data}:{id:number,data:data}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.API}/dashboard/companies/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json'
        },
        body:JSON.stringify(data)
    })
    const payload = await res.json()
    return payload
}