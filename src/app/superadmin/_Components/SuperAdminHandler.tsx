"use client"

import { deleteCookie} from "cookies-next"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"


export default function SuperAdminHandler() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    //delete company-id cookie if exists
    deleteCookie("company-id")
    if (params.get("toast") === "select-company") {
      toast("Select a Company First!",{position:"top-right"})

      // clean the URL
      router.replace("/superadmin")
    }
  }, [params, router])

  return null
}