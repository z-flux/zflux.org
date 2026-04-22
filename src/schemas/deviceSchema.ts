import * as z from 'zod' 


export const device =z.object({
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    identifier:z.string().nonempty('Identifier is required').min(3,'minimum length is 3 charachters'),
    branch_id:z.string().nonempty("branch is required"),
    is_active:z.boolean().optional()
})

export type DeviceScheme = z.infer<typeof device>
