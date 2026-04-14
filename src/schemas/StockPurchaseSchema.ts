import * as z from 'zod' 


export const stock_purchase =z.object({
   item_id:z.string().nonempty("item is required"),
   branch_id:z.string().nonempty("branch is required"),
   quantity:z.number().nonnegative().nonoptional(),
   notes:z.string().optional()
})

export type StockPurchaseScheme = z.infer<typeof stock_purchase>