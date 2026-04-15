"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Unit } from "@/interfaces/units"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import UpdateUnit from "./_Components/UpdateUnit"
import PopUpMessage from "./_Components/PopUpMessage"


export const columns : ColumnDef<Unit>[] = [
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
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unit = row.original
 
      return (
        <div className="flex gap-4  items-center me-4">
            <UpdateUnit chosenUnit={unit}></UpdateUnit>
            <PopUpMessage id={unit.id}></PopUpMessage>
        </div>
      )
    },
  },
]