import * as z from 'zod' 


export const subcategory =z.object({
    category_id:z.number().nonnegative().nonoptional(),
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    description:z.string().nonempty('description is required').min(3,'minimum length is 3 charachters'),
    is_active:z.boolean()
})

export type SubcategoryScheme = z.infer<typeof subcategory>