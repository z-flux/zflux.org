"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Subcategory } from "@/interfaces/subcategory"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import UpdateSubcategory from "./_Components/UpdateSubcategory"
import PopUpMessage from "./_Components/PopUpMessage"
import { usePermission } from "@/hooks/usePermission"

export const columns : ColumnDef<Subcategory>[] = [
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
    accessorKey: "category_id",
    header: "Category Id",
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
          SubCategory Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "is_active",
    header: "Is Active",
  },
  {
      id: "actions",
      cell: ({ row }) => {
        const subcategory = row.original
        const {can} = usePermission()
  
        return (
          <div className="flex gap-4 items-center me-4">
            {can("edit_subcategories")&&
            <UpdateSubcategory chosenSubcategory={subcategory}></UpdateSubcategory>}
            {can("delete_subcategories")&&
            <PopUpMessage id={subcategory.id}></PopUpMessage>}
          </div>
        )
      },
    },
]