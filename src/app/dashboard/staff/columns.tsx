"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { Staff } from "@/interfaces/staff"
import ToggleStaffActivation from "./_Components/ToggleStaffActivation"
import UpdateStaffBtn from "./_Components/UpdateStaffBtn"

export const columns : ColumnDef<Staff>[] = [
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
    accessorKey: "branch_id",
    header: "Branch Id",
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
          Customer Name
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
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "active",
    header:"is Active",
    cell: ({ row }) => {
      const staff = row.original
      const {can} = usePermission()

      return (
        <div className="">
          {can("edit_staff")&&
          <ToggleStaffActivation chosenStaff={staff}/>}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const staff = row.original
      const {can} = usePermission()

      return (
        <div className="flex gap-4 items-center me-4">
          {can("edit_staff")&&
          <UpdateStaffBtn chosenStaff={staff}/>}
          {can("delete_staff")&&
            <></>}
        </div>
      )
    },
  },
]