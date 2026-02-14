"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Branch } from "@/interfaces/branch"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import PopUpMessage from "./_Components/PopUpMessage"
import UpdateBranch from "./_Components/UpdateBranch"






export const columns : ColumnDef<Branch>[] = [
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
    accessorKey: "company_id",
    header: "Company Id",
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
          Branch Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "manager_name",
    header: "Manager Name ",
  },
  {
    accessorKey: "manager_phone",
    header: "Manager Phone ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const branch = row.original
 
      return (
        <div className="flex gap-4  items-center me-4">
          <UpdateBranch branch={branch}></UpdateBranch>
            <PopUpMessage id={branch.id}></PopUpMessage>
            <button><i className="cursor-pointer text-sm  fa-regular fa-eye font-thin hover:text-green-600 transition duration-100"></i></button>
        </div>
      )
    },
  },
]