import { useSession } from "next-auth/react"

export function usePermission() {
  const { data: session } = useSession()

  const can = (permission: string): boolean => {
    if (!session) return false
    if (session.user?.user.is_super_admin) return true
    const res= session.user?.permissions.includes(permission) ?? false
    return res
  }

  return { can, cannot: (p: string) => !can(p) }
}
