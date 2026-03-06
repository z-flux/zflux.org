"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function SidebarClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger className="ml-2 z-50"/>
        {children}
    </SidebarProvider>
  )
}
