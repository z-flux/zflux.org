import { Button } from '@/components/ui/button'
import { setCookie } from 'cookies-next'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginAsCompany({id}:{id:number}) {
    
   
  async function login(){  
    
    setCookie("company-id", id.toString())
    
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1000)
  }
  return (
    <Button onClick={login}>Login As Company</Button>
  )
}
