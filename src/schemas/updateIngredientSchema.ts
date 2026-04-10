import * as z from 'zod' 


export const ingredient =z.object({
   name:z.string().nonempty("name is required"),
   sku:z.string().nonempty("sku is required"),
   cost_price:z.number().nonnegative().nonoptional(),
   purchase_unit_id:z.string().nonempty("purchase unit is required"),
   min_stock_level:z.number().nonnegative().nonoptional(),
   max_stock_level:z.number().nonnegative().nonoptional(),
})

export type UpdateIngredientScheme = z.infer<typeof ingredient>