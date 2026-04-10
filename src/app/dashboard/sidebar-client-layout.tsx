"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from "next-auth/react";

export default function SidebarClientLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const {data:session} = useSession()
  const isSuperAdmin= session?.user?.user.is_super_admin
  
  
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger className={`ml-2 sticky z-50 ${isSuperAdmin==true?"top-10":"top-2"}`}/>
        {children}
    </SidebarProvider>
  )
}
