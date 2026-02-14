import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest,context: { params: Promise<{ id: string }> }) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
const { id } = await context.params
  if (!token?.token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const res = await fetch(`https://api.zflux.org/api/dashboard/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token.token}`
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}

