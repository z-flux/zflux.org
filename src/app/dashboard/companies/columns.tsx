"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Company } from "@/interfaces/company"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import PopUpMessage from "./_Components/PopUpMessage"
import UpdateCompany from "./_Components/UpdateCompany"




export const columns: ColumnDef<Company>[] = [
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
    accessorKey: "status",
    header: "Status",
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
    id: "actions",
    cell: ({ row }) => {
      const company = row.original
 
      return (
        <div className="flex justify-between items-center ">
            <UpdateCompany id={company.id}></UpdateCompany>
            <PopUpMessage id={company.id}></PopUpMessage>
            <Button variant={'ghost'}><i className="cursor-pointer text-lg fa-regular fa-eye text-green-600"></i></Button>
        </div>
      )
    },
  },
]