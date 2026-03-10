import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginAsCompany({id}:{id:number}) {
    const [isLoading,setIsLoading]=useState(false)
    const email = sessionStorage.getItem("admin_email")
  const password = sessionStorage.getItem("admin_password")
   
  async function login(){  
    setIsLoading(true)
  const res = await signIn('credentials',{
      email,
      password,
      redirect:false,
      companyId:id
    })
    if(res?.ok){
        setIsLoading(false)
        redirect('/dashboard') 
    }
    else{
      setIsLoading(false)
      toast.error(`${res?.error}`,{position:"top-center",duration:3000})
    }
    }
  return (
    <Button onClick={login}>{isLoading?<i className="tinyLoader"></i>:<p>Login As Company</p>}</Button>
  )
}
