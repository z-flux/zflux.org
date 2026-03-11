"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Product } from "@/interfaces/products"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import UpdateProduct from "./_Components/UpdateProduct"
import PopUpMessage from "./_Components/PopUpMessage"
import { usePermission } from "@/hooks/usePermission"

export const columns : ColumnDef<Product>[] = [
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
          Product Name
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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "is_active",
    header: "Is Active",
  },
  {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original
        const {can} = usePermission()
  
        return (
          <div className="flex gap-4 items-center me-4">
            {can("edit_products")&&
              <UpdateProduct chosenProduct={product}></UpdateProduct>}
            {can("delete_products")&&
              <PopUpMessage id={product.id}></PopUpMessage>}
          </div>
        )
      },
    },
]