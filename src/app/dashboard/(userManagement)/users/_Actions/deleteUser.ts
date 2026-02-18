'use server'

import GetAuthToken from "@/GetAuthToken"

export async function deleteUser({id}:{id:number}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    console.log("API:", process.env.NEXT_PUBLIC_API)
console.log("Deleting ID:", id)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/users/${id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json'
        }
    })
    const payload = await res.json()
    return payload
}