'use client'
import { langContext } from '@/lang.context'
import { ThemeContext } from '@/theme.context'
import { useContext, useState } from 'react'
import logo from '../../../assets/zfluxLogotrying-01.png'
import darkLogo from '../../../assets/zfluxLogoPLSNOMOREpng-01.png'
import SideBar from './SideBar'
import Content from './Content'

export default function NavBarWSideBar() {
    const mytheme=useContext(ThemeContext)!
    const {theme,setTheme}=mytheme

    const myLang = useContext(langContext)!
    const {lang,setLang} = myLang
    const [isOpen,setOpen]=useState<boolean>(true)
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
function toggleSideBar(){
    setOpen(!isOpen)
}    
  return (
    <div>
  <nav className="bg-transparent fixed top-0 z-50 w-full bg-neutral-primary-soft ">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          <button onClick={()=>toggleSideBar()} data-drawer-target="top-bar-sidebar" data-drawer-toggle="top-bar-sidebar" aria-controls="top-bar-sidebar" type="button" className="sm:hidden text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium font-medium leading-5 rounded-base text-sm p-2 ">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h10" />
            </svg>
          </button>
          <p  className="flex ms-2 md:me-24">
            <span className="self-center text-4xl font-semibold text-black dark:text-gray-100 whitespace-nowrap ">Z-Flux</span>
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-4 ms-4">
            <i className={`cursor-pointer text-xl fa-regular text-black dark:text-gray-300 ${theme=='dark'?'fa-sun':'fa-moon'}`} onClick={()=>toggleTheme()}></i>
    <div onClick={()=>toggleLang()} className='flex gap-2 text-black dark:text-gray-300 items-center border rounded-full py-1 px-2 cursor-pointer'>
        <i className='fa-solid fa-globe '></i>
        <p className='font-bold '>{lang=='ar'?'EN':'AR'}</p>
    </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <SideBar open={!isOpen}></SideBar>
  
</div>

  )
}
