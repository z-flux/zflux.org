'use server'

import GetAuthToken from "@/GetAuthToken"

export interface data{
    name: string,
    permissions:string[]

}

export async function updateRole({id,data}:{id:number,data:data}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.API}/dashboard/roles/${id}`,{
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