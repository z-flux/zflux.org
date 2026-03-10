import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {  LogOut } from "lucide-react"
import Link from "next/link"

import { useContext } from "react"
import { langContext } from "@/lang.context"
import darklogo from '../../assets/light.svg'
import lightlogo from '../../assets/zfluxdarkLogo.svg'
import Image from "next/image"
import { ThemeContext } from "@/theme.context"
import { signOut } from "next-auth/react"

export function SuperSidebar() {
  const myLang = useContext(langContext)!
      const {lang} = myLang
      const mytheme=useContext(ThemeContext)!
          const {theme}=mytheme
  return (
    <Sidebar  side={lang === 'ar' ? 'right' : 'left'}  className="w-60">
      <SidebarHeader>
        <Link href="/superadmin">
        <Image alt='' className="w-[40%] me-auto mt-4" src={theme=='dark'? darklogo:lightlogo} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>


  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/superadmin/companies">
        <span>Companies</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>


  
</SidebarMenu>

        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
       <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={async()=>await signOut() }>
          <LogOut  /> Sign out
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
    </Sidebar>
  )
}