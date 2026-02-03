import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";




export const AuthOptions:NextAuthOptions={
    pages:{signIn:'/'},
    providers:[
        Credentials({
            name:'credentials',
            credentials:{
                email:{},
                password:{}
            },
            authorize:(async (credentials)=>{
                const res = await fetch(`https://api.zflux.org/api/login`,{
                    method:'POST',
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    }),
                    headers:{
                        'content-type':'application/json'
                    }
                })
                const payload = await res.json()
                if(payload.data.token){
                   
                    
                    return {
                        id:payload.data.user.id,
                        user:payload.data.user,
                        token:payload.data.token,
                        expiresAt:Math.floor(Date.now()/1000)+payload.data.expires_in
                    }
                }
                else { throw new Error (payload.error || 'something went wrong')}
            })
        })
    ],
    callbacks:{
async jwt({ token, user }) {
  
  
  if (user) {
    token.token = user.token
    token.user = user.user
    token.expiresAt = user.expiresAt
    token.id = user.id
    return token
  }
  
  return token

  },
  async session({ session, token }) {
    if(token.user){
        session.user=token.user
    }else {
      session.user = null
    }
    return session
  }
    }
}
