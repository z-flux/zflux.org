'use server'

import GetAuthToken from "@/GetAuthToken"


interface data{
name:string,
tax_rate:number,
status:string
}

export async function updateBranch({id,data}:{id:number,data:data}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/branches/${id}`,{
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