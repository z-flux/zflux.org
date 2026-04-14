import * as z from 'zod' 


export const stock_waste =z.object({
   item_id:z.string().nonempty("item is required"),
   branch_id:z.string().nonempty("branch is required"),
   quantity:z.number().nonnegative().nonoptional(),
   reference_type:z.string().nonempty("reference type is required"),
   reference_id:z.string().optional(),
   notes:z.string().optional()
})

export type StockWasteScheme = z.infer<typeof stock_waste>