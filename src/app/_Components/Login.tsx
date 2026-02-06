"use client";

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, loginScheme } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from '../../assets/zfluxLogotrying-01.png'
import darkLogo from '../../assets/zfluxLogoPLSNOMOREpng-01.png'
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContext, useState } from "react";
import { ThemeContext } from "@/theme.context";
export default function Login() {
  const mytheme=useContext(ThemeContext)!
      const {theme}=mytheme
      const [isLoading,setIsLoading]=useState(false)
  const form = useForm<loginScheme>({
    resolver: zodResolver(login),
    defaultValues: {
      email: "",
      password: "",
    },
  });
 async function onSubmit(data: loginScheme) {
  
    setIsLoading(true)
    
  const res = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })
    
    if(res?.ok){
        setIsLoading(false)
        window.location.href='/dashboard'
        
    }
    else{
      setIsLoading(false)
      toast.error(`${res?.error}`,{position:"top-center",duration:3000})
      
    }
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800  flex justify-center items-center">
      
      <Form {...form}>
        <div className="flex w-full m-14 sm:w-1/2 rounded-2xl border border-gray-300 p-4">
        
        <form className="w-full md:p-8 lg:w-1/2 flex flex-col gap-4 p-2 lg:p-5" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-semibold text-3xl text-gray-800 dark:text-gray-100!">Login Now:</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold  text-gray-800! dark:text-gray-100!' >Email:</FormLabel>
                <FormControl>
                  <Input
                  
                    className=" bg-gray-50! text-black!  border border-[#4f4f4f70]"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-600 dark:text-red-400"
                    role="alert"
                  >
                    <FormMessage />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md text-gray-800! dark:text-gray-100!' >Password:</FormLabel>
                <FormControl>
                  <Input type="password"
                    className="border bg-gray-50! text-black! border-[#4f4f4f70]"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <FormMessage />
                  </div>
                )}
              </FormItem>
            )}
          />
        
          <button className=" bg-purple-600 cursor-pointer px-4 py-2 w-[90%] mt-4 text-xl font-normal mx-auto rounded-lg hover:bg-main transition duration-200">{isLoading?<i className="tinyLoader"></i>:<p>login</p>}</button>
        </form>
        <div className="hidden  lg:w-1/2 bg-white dark:bg-gray-800 lg:flex justify-center items-center border-s border-gray-300">
          <Image  alt="Zflux" src={theme=='dark'?darkLogo:logo} />
        </div>
        </div>
        
      </Form>
    </div>
  );
}
