import { getServerSession } from "next-auth";
import { AuthOptions } from "@/authOptions";
import { redirect } from "next/navigation";
import SidebarClientLayout from "./sidebar-client-layout";
import NavBarWSideBar from "../dashboard/_Components/NavBarWSideBar";

export default async function SuperAdminLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {

  
const session = await getServerSession(AuthOptions)
if(session?.user?.user.is_super_admin&&session.user.user.company_id==null){
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
}else if(session!=null){
redirect('/dashboard')
}
else{
  redirect('/')
}
}