import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {  ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useContext } from "react"
import { langContext } from "@/lang.context"
import darklogo from '../assets/light.svg'
import lightlogo from '../assets/zfluxdarkLogo.svg'
import Image from "next/image"
import { ThemeContext } from "@/theme.context"
import { signOut } from "next-auth/react"

export function AppSidebar() {
  const myLang = useContext(langContext)!
      const {lang} = myLang
      const mytheme=useContext(ThemeContext)!
          const {theme}=mytheme
  return (
    <Sidebar  side={lang === 'ar' ? 'right' : 'left'}  className="w-60">
      <SidebarHeader>
<Image alt='' className="w-[40%] me-auto mt-4" src={theme=='dark'? darklogo:lightlogo} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>


  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/companies">
        <span>Companies</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>

<Collapsible
            
            asChild
            
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton >
                  
                  <span>User Management</span>
                  {lang=='ar'?<ChevronLeft className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90"/> :
                  <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub >
            
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard/users">Users</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>

          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard/roles">Roles</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>

          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard/permissions">Permissions</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

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