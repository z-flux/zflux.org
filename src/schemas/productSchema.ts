import * as z from 'zod' 


export const product =z.object({
    category_id:z.string().nonempty("category is required"),
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    sku:z.string().nonempty('sku is required').min(3,'minimum length is 3 charachters'),
    price:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
    is_active:z.boolean()
})

export type ProductScheme = z.infer<typeof product>