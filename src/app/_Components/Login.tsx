"use client";

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, loginScheme } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
export default function Login() {
  const form = useForm<loginScheme>({
    resolver: zodResolver(login),
    defaultValues: {
      email: "",
      password: "",
    },
  });
 async function onSubmit(data: loginScheme) {
  
    console.log(data);
    
  const res = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })
    console.log(res);
    
    if(res?.ok){
        
        window.location.href='/dashboard'
        
    }
    else{
      toast.error(`${res?.error}`,{position:"top-center",duration:3000})
      
    }
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800  flex justify-center items-center">
      
      <Form {...form}>
        <form className="w-1/3 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100!">Login Now:</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md text-gray-800! dark:text-gray-100!' >Email:</FormLabel>
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
        
          <button className="bg-main cursor-pointer px-4 py-2 w-3xs mt-4 text-xl font-semibold mx-auto rounded-lg hover:bg-main/90 transition duration-200">login</button>
        </form>
      </Form>
    </div>
  );
}
