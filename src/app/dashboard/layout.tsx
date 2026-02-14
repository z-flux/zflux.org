import { getServerSession } from "next-auth";
import NavBarWSideBar from "./_Components/NavBarWSideBar";
import { AuthOptions } from "@/authOptions";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarClientLayout from "./sidebar-client-layout";

export default async function DashboardLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {

  
const session = await getServerSession(AuthOptions)
if(session?.user?.is_super_admin&&session.user.company_id==null){
return (
    <div className="">
      <NavBarWSideBar />
      
      <SidebarClientLayout>
      <main className="flex-1 min-w-0 my-10">
       
        {children}
      </main>
    </SidebarClientLayout>
    </div>
  )
}else{
  redirect('/')
}

  
}