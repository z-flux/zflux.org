"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Shift } from "@/interfaces/shifts"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import UpdateShift from "./_Components/UpdateShift"
import PopUpMessage from "./_Components/PopUpMessage"


export const columns : ColumnDef<Shift>[] = [
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
          Shift Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
  },
  {
  accessorKey: "start_time",
  header: "Start Time",
  cell: ({ getValue }) => {
    const value = getValue<string>()
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value))
  },
},
{
  accessorKey: "end_time",
  header: "End Time",
  cell: ({ getValue }) => {
    const value = getValue<string>()
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value))
  },
},
  {
    accessorKey: "is_active",
    header: "Is Active",
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
        const shift = row.original
  
        return (
          <div className="flex gap-4 items-center me-4">
                <UpdateShift chosenShift={shift}></UpdateShift>
                <PopUpMessage id={shift.id}></PopUpMessage>
              <button ><i className="cursor-pointer text-sm  fa-regular fa-eye font-thin hover:text-green-600 transition duration-100"></i></button>
          </div>
        )
      },
    },
]