"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Role } from "@/interfaces/role"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import PermissionsPopUp from "./_Components/PermissionsPopUp"
import PopUpMessage from "./_Components/PopUpMessage"
import UpdateRolePermissions from "./_Components/UpdateRolePermissions"




export const columns : ColumnDef<Role>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
  },
 {
  accessorKey: "created_at",
  header: "Created At",
  cell: ({ getValue }) => {
    const value = getValue<string>()
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value))
  },
},
{
  accessorKey: "updated_at",
  header: "Last Updated",
  cell: ({ getValue }) => {
    const value = getValue<string>()
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value))
  },
},
 {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original
 
      return (
        <div className="flex justify-between items-center me-4">
          <UpdateRolePermissions role={role}></UpdateRolePermissions>
            <PopUpMessage id={role.id}></PopUpMessage>
            <PermissionsPopUp role={role}></PermissionsPopUp>
        </div>
      )
    },
  },

  
]