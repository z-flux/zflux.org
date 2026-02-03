'use client'

import { createContext, useEffect, useState } from "react"



type Theme='dark' | 'light'
interface ThemeType{
    theme:Theme,
    setTheme:React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext=createContext<ThemeType|null>(null)

export default function ThemeContextProvider({children}:{children:React.ReactNode}){
    
    const [theme,setTheme]=useState<Theme>('light')

    useEffect(()=>{
        const prefferedTheme = localStorage.getItem('theme') as Theme|null
        if(prefferedTheme){

         setTheme(prefferedTheme)
        }else{
            const systemTheme= window.matchMedia("(prefers-color-scheme: dark)").matches?'dark':'light'
            setTheme(systemTheme)
        }

    },[])

    useEffect(()=>{
        document.documentElement.classList.toggle('dark',theme==='dark')
        localStorage.setItem('theme',theme)
    },[theme])

    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}