"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Customer } from "@/interfaces/customers"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import PopUpMessage from "./_Components/PopUpMessage"
import UpdateCustomer from "./_Components/UpdateCustomer"
import { usePermission } from "@/hooks/usePermission"
import ToggleActivation from "./_Components/ToggleActivation"

export const columns : ColumnDef<Customer>[] = [
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
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "isActive",
    header:"is Active",
    cell: ({ row }) => {
      const customer = row.original
      const {can} = usePermission()

      return (
        <div className="">
          {can("edit_customers")&&
          <ToggleActivation chosenCustomer={customer} />
          }
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      const {can} = usePermission()

      return (
        <div className="flex gap-4 items-center me-4">
          {can("edit_customers")&&
          <UpdateCustomer chosenCustomer={customer}></UpdateCustomer>}
          {can("delete_customers")&&
            <PopUpMessage id={customer.id}></PopUpMessage>}
        </div>
      )
    },
  },
]