import * as z from 'zod' 


export const purchase_order =z.object({
    supplier_id:z.string().nonempty("supplier is required"),
    branch_id:z.string().nonempty("branch is required"),
    expected_at:z.string().nonempty("expected delivery date is required"),
    mark_as_ordered:z.boolean(),
    notes:z.string().optional(),
    items:z.array(z.object({
        item_id:z.string().nonempty("ingredient is required"),
        quantity_ordered:z.number().nonnegative(),
        unit_cost:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
    }))
})

export type PurchaseOrderScheme = z.infer<typeof purchase_order>