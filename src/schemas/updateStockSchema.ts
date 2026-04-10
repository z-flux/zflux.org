import * as z from 'zod' 


export const stock =z.object({
   item_id:z.string().nonempty("item is required"),
   branch_id:z.string().nonempty("branch is required"),
   quantity:z.number().nonnegative().nonoptional(),
   note:z.string().optional()
})

export type StockScheme = z.infer<typeof stock>