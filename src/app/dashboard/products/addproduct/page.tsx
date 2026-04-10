import React from 'react'
import AddProduct from './_Components/AddProduct'

export default function page() {
  return (
    <div className="min-h-screen">
        <div className="w-[95%] mx-auto py-10">
            <div className="w-full">
              <AddProduct/>
            </div>
        </div>
    </div>
  )
}
