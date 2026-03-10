import NextAuth,{User} from "next-auth"

declare module "next-auth" {
    
    interface User{
        user:{
        id: number,
        name: string,
        email: string,
        is_super_admin:boolean,
        company_id:number|null
        },
        token:string,
        expiresAt:number,
        roles:{
          id:number,
          name:string
        }[],
        permissions:string[]

    }

  interface Session {
    user: User | null,
    
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    // MUST be optional
    user: User
    token?: string
    expiresAt?: number
  }
}