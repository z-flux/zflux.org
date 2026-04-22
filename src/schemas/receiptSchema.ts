import * as z from 'zod' 


export const receipt =z.object({
    notes:z.string().optional(),
    items:z.array(z.object({
        purchase_order_item_id:z.string().nonempty("ingredient is required"),
        quantity_received:z.number().nonnegative(),
        unit_cost:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
    }))
})

export type ReceiptScheme = z.infer<typeof receipt>