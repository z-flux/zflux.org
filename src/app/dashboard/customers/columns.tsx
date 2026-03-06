"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Customer } from "@/interfaces/customers"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import PopUpMessage from "./_Components/PopUpMessage"
import UpdateCustomer from "./_Components/UpdateCustomer"

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
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original

      return (
        <div className="flex gap-4 items-center me-4">
          <UpdateCustomer chosenCustomer={customer}></UpdateCustomer>
            <PopUpMessage id={customer.id}></PopUpMessage>
            <button ><i className="cursor-pointer text-sm  fa-regular fa-eye font-thin hover:text-green-600 transition duration-100"></i></button>
        </div>
      )
    },
  },
]