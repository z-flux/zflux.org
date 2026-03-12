"use client"


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SuperSidebar } from "./SupeSidebar"

export default function SidebarClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SuperSidebar/>
        <SidebarTrigger className="ml-2 sticky z-50 top-2"/>
        {children}
    </SidebarProvider>
  )
}
