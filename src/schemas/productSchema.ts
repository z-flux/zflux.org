import * as z from 'zod' 


export const product =z.object({
    category_id:z.string().nonempty("category is required"),
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    variants:z.array(z.object({
        name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
        price:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
        recipe:z.array(z.object({
            ingredientId:z.string(),
            amount:z.number().nonnegative()
        })).optional()
    }))
})

export type ProductScheme = z.infer<typeof product>