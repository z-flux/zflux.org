import { getServerSession } from "next-auth";
import NavBarWSideBar from "./_Components/NavBarWSideBar";
import { AuthOptions } from "@/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {

  
const session = await getServerSession(AuthOptions)
if(session?.user?.is_super_admin&&session.user.company_id==null){
return (
    <div className="">
      <NavBarWSideBar />
      <main className="sm:ms-64 mt-16 ">{children}</main>
    </div>
  )
}else{
  redirect('/')
}

  
}