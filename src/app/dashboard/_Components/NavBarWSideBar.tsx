'use client'
import { langContext } from '@/lang.context'
import { ThemeContext } from '@/theme.context'
import { useContext, useState } from 'react'


export default function NavBarWSideBar() {
    const mytheme=useContext(ThemeContext)!
    const {theme,setTheme}=mytheme

    const myLang = useContext(langContext)!
    const {lang,setLang} = myLang
 function toggleTheme(){
      if(theme=='dark'){
         setTheme('light')
        }else{
         setTheme('dark')
        }}
 function toggleLang(){
    if(lang=='en'){
        setLang('ar')
    }else{
        setLang('en')
    }}
 
  return (
    <div>
  <nav className="bg-transparent fixed top-0 z-40 right-0 left-64 rtl:left-0 rtl:right-64 bg-neutral-primary-soft ">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
         
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-4 ms-4">
            <i className={`cursor-pointer text-sm fa-regular text-black dark:text-gray-300 ${theme=='dark'?'fa-sun':'fa-moon'}`} onClick={()=>toggleTheme()}></i>
    <div onClick={()=>toggleLang()} className='flex gap-2 text-black dark:text-gray-300 items-center border rounded-full py-1 px-2 cursor-pointer'>
        <i className='fa-solid fa-globe text-sm'></i>
        <p className='font-semibold text-sm'>{lang=='ar'?'EN':'AR'}</p>
    </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
</div>

  )
}
