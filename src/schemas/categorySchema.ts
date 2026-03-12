import * as z from 'zod' 


export const category =z.object({
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    description:z.string().nonempty('Description is required').min(3,'minimum length is 3 charachters'),
    is_active:z.boolean()
})

export type CategoryScheme = z.infer<typeof category>
