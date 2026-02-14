"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { User } from "@/interfaces/user"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import UpdateUser from "./_Components/UpdateUser"
import PopUpMessage from "./_Components/PopUpMessage"
import RolesPopUp from "./_Components/RolesPopUp"





export const columns : ColumnDef<User>[] = [
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
          User Name
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
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "branch.id",
    header: "Branch ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <div className="flex gap-4  items-center me-4">
            <UpdateUser user={user}></UpdateUser>
            <PopUpMessage id={user.id}></PopUpMessage>
            <RolesPopUp user={user}></RolesPopUp>
        </div>
      )
    },
  },
]