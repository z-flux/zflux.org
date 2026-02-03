import { getServerSession } from "next-auth";
import NavBarWSideBar from "./_Components/NavBarWSideBar";
import { AuthOptions } from "@/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {

  
const session = await getServerSession(AuthOptions)
if(session?.user?.is_super_admin){
return (
    <div className="">
      <NavBarWSideBar />
      <main className="">{children}</main>
    </div>
  )
}else{
  redirect('/')
}

  
}