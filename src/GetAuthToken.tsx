import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import React from 'react'

export default async function GetAuthToken() {
    const Cookies = await cookies()
    const token = Cookies.get('next-auth.session-token')
    const decoded = await decode({token:token?.value,secret:process.env.NEXTAUTH_SECRET!})
  return (
    decoded?.token
  )
}
