import * as z from 'zod' 


export const direct_Invoice =z.object({
    supplier_id:z.string().nonempty("supplier is required"),
    branch_id:z.string().nonempty("branch is required"),
    invoice_number:z.string().nonempty('invoice_number is required'),
    invoice_date:z.string().nonempty("invoice date is required"),
    notes:z.string().optional(),
    items:z.array(z.object({
        item_id:z.string().nonempty("ingredient is required"),
        quantity_received:z.number().nonnegative(),
        unit_cost:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
    }))
})

export type DirectInvoiceScheme = z.infer<typeof direct_Invoice>