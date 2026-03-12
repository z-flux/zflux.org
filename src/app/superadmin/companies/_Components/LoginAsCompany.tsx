import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { setCookie } from 'cookies-next'
import { LogInIcon } from 'lucide-react'
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
   <Tooltip>
      <TooltipTrigger asChild>
        <LogInIcon onClick={login} className='cursor-pointer '></LogInIcon>
      </TooltipTrigger>
      <TooltipContent>
        <p>Login as a company</p>
      </TooltipContent>
    </Tooltip>
  )
}
