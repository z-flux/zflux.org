import { AuthOptions } from '@/authOptions'
import { getCookie } from 'cookies-next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token?.token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  const session =await getServerSession(AuthOptions)
  const isSuperAdmin=session?.user?.user.is_super_admin
  const companyId = await getCookie("company-id", { req })
  
  
  const headers: HeadersInit = {
  Authorization: `Bearer ${token.token}`,
}

if (isSuperAdmin && companyId) {
  headers["X-Company-id"] = companyId.toString()
}
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/branches`, {
    headers
  })

  const data = await res.json()
  return NextResponse.json(data)
}

