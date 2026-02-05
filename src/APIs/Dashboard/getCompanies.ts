import GetAuthToken from "@/GetAuthToken"


export default async function GetCompanies(){
    const token= await GetAuthToken()
    if(!token){
        throw new Error('Unauthorized, login first!')
    }

    const data = await fetch(`https://api.zflux.org/api/dashboard/companies`,{
        headers:{
            Authorization:`Bearer ${token}`,
            Accept: 'application/json'
        }
    })
    const payload = await data.json()
    return payload
}