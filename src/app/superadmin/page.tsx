'use client'
import React, { useEffect } from 'react'
import Content from '../dashboard/_Components/Content'
import { deleteCookie } from 'cookies-next'

export default function page() {
  useEffect(()=>{
    deleteCookie("company-id")
  },[])
 
  
  
  return (
    <div><Content></Content></div>
  )
}
