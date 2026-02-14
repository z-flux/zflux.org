"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Company } from "@/interfaces/company"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import PopUpMessage from "./_Components/PopUpMessage"
import UpdateCompany from "./_Components/UpdateCompany"




export const columns : ColumnDef<Company>[] = [
   {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }, 
  {
    accessorKey: "id",
    header: "Id",
  },
  
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original
 
      return (
        <div className="flex gap-4  items-center me-4">
            <UpdateCompany company={company}></UpdateCompany>
            <PopUpMessage  id={company.id}></PopUpMessage>
            <button ><i className="cursor-pointer text-sm  fa-regular fa-eye font-thin hover:text-green-600 transition duration-100"></i></button>
        </div>
      )
    },
  },
]