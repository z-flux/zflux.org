import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
        const token = await getToken({req:request, secret: process.env.NEXTAUTH_SECRET})
        if (!token || !token.expiresAt || Date.now() / 1000 >= token.expiresAt) {
    const res = NextResponse.redirect(new URL("/", request.url))

    // delete BOTH possible cookie names
    res.cookies.delete("next-auth.session-token")
    res.cookies.delete("__Secure-next-auth.session-token")
    res.cookies.delete("__Host-next-auth.session-token")

    return res
  }
        else{
          
  return NextResponse.next()
        }
}

export const config = {
  matcher: '/dashboard/:path*'
}