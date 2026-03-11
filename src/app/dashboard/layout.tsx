import { getServerSession } from "next-auth";
import NavBarWSideBar from "./_Components/NavBarWSideBar";
import { AuthOptions } from "@/authOptions";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarClientLayout from "./sidebar-client-layout";
import { SuperAdminBanner } from "../_Components/SuperAdminBanner";
import { headers } from "next/headers";
import toast from "react-hot-toast";

export default async function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await getServerSession(AuthOptions)
  const headersList = await headers()
  const cookieStore = headersList.get('cookie') || ''
  const companyId = cookieStore
    .split('; ')
    .find((row: string) => row.startsWith('company-id='))
    ?.split('=')[1]


  if(!companyId&&session?.user?.user.is_super_admin){
    redirect("/superadmin")
  }
  return (
    <div className="">
      <SuperAdminBanner session={session}/>
      <NavBarWSideBar />
      
      <SidebarClientLayout>
      <main className="flex-1 min-w-0 my-10 ">
       
        {children}
      </main>
    </SidebarClientLayout>
    </div>
  )

  
}