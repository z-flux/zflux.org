import * as z from 'zod' 


export const product =z.object({
    subcategory_id:z.string().nonempty("category is required"),
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    variants:z.array(z.object({
        sku:z.string().nonempty('sku is required').min(3,'minimum length is 3 charachters'),
        variant_name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
        selling_price:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
        ingredients:z.array(z.object({
            item_id:z.string(),
            quantity:z.number().nonnegative(),
            unit_id:z.string().nonempty("unit is required")
        })).optional()
    }))
})

export type ProductScheme = z.infer<typeof product>