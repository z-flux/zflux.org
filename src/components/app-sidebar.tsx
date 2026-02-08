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
import {  ChevronLeft, ChevronRight, User2 } from "lucide-react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useContext } from "react"
import { langContext } from "@/lang.context"

export function AppSidebar() {
  const myLang = useContext(langContext)!
      const {lang} = myLang
  return (
    <Sidebar  side={lang === 'ar' ? 'right' : 'left'}  className="w-60">
      <SidebarHeader>

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
              <Link href="/dashboard">Users</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>

          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard">Roles</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>

          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard">Permissions</Link>
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
        <SidebarMenuButton>
          <User2 /> Username
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
    </Sidebar>
  )
}