'use server'

import GetAuthToken from "@/GetAuthToken"
import { BranchSchema } from "@/schemas/branchSchema"

export async function createBranch({Cdata}:{Cdata:BranchSchema}){
    const token = await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized!')
    }
    const apiPayload = {
  ...Cdata,
  settings: Object.fromEntries(Cdata.settings.map(s => [s.key, s.value])),
}
    const res = await fetch(`${process.env.API}/dashboard/branches`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
            accept:'application/json',
            'content-Type':'application/json'
        },
        body:JSON.stringify(apiPayload)
    })
    const payload = await res.json()
    return payload
}