import * as z from 'zod' 


export const updateUsers =z.object({
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    salary:z.string()
  .regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
    status:z.string().nonempty('Status is required').min(3,'minimum length is 3 charachters'),
})

export type UpdateUserScheme = z.input<typeof updateUsers>
