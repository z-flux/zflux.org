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
import { signOut, useSession } from "next-auth/react"
import { usePermission } from "@/hooks/usePermission"

export function AppSidebar() {
  const myLang = useContext(langContext)!
  const {lang} = myLang
  const mytheme=useContext(ThemeContext)!
  const {theme}=mytheme
  const {data:session} = useSession()
  const {can} = usePermission()
  return (
    <Sidebar  side={lang === 'ar' ? 'right' : 'left'}  className="w-60">
      <SidebarHeader className={session?.user?.user.is_super_admin ? 'pt-8' : ''}>
        <Link href="/dashboard">
        <Image alt='' className="w-[40%] me-auto mt-4" src={theme=='dark'? darklogo:lightlogo} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>

{can("view_branches")&&
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/branches">
        <span>Branches</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
}
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
          {can("view_users")&& 
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard/users">Users</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
} {can("view_roles")&&
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard/roles">Roles</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
} {can("view_permissions")&&
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/dashboard/permissions">Permissions</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
}
        </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          
{can("view_categories")&&
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/categories">
        <span>Categories</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem> 
}
{can("view_subcategories")&&
<SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/subcategories">
        <span>SubCategories</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem> 
}   {can("view_products")&&
<SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/products">
        <span>Products</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem> 
} {can("view_customers")&&
<SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/customers">
        <span>Customers</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem> 
}
{can("view_staff")&&
<SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/staff">
        <span>Staff</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem> 
}
{can("view_stocks")&&
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/stocks">
        <span>Inventory & Items</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
} 
{can("view_orders")&&
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/purchase_orders">
        <span>Purchase Orders</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
} 
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href="/dashboard/cashier_devices">
        <span>Cashier Devices</span>
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
          <LogOut className="rtl:rotate-180" /> Sign out
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
    </Sidebar>
  )
}