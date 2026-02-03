'use client'

import { createContext, useEffect, useState } from "react"

type Lang='en'|'ar';

interface langType{
    lang:Lang,
    setLang:React.Dispatch<React.SetStateAction<Lang>>
}
export const langContext = createContext<langType |null>(null)
export default function LangContextProvider({children}:{children:React.ReactNode}){
    const [lang,setLang]=useState<Lang>('en')

    //checks if there is a previous preffered language and assigns it to the lang state
    useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) setLang(saved)
  }, [])

  
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  return(
    <langContext.Provider value={{lang,setLang}}>
        {children}
    </langContext.Provider>
  )
}