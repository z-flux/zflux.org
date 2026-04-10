import { getServerSession } from "next-auth";
import NavBarWSideBar from "./_Components/NavBarWSideBar";
import { AuthOptions } from "@/authOptions";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarClientLayout from "./sidebar-client-layout";
import { SuperAdminBanner } from "../_Components/SuperAdminBanner";
import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";

export default async function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await getServerSession(AuthOptions)
  const cookieStore = await cookies()
  const companyId = cookieStore.get("company-id")?.value
  const isSuperAdmin = session?.user?.user.is_super_admin
  if(!companyId && isSuperAdmin){
    redirect("/superadmin?toast=select-company")
  }
  return (
    <div className="">
      {isSuperAdmin&&
      <SuperAdminBanner session={session}/>}
      <NavBarWSideBar />
      
      <SidebarClientLayout >
      <main className="flex-1 min-w-0 my-10">
       
        {children}
      </main>
    </SidebarClientLayout>
    </div>
  )

  
}