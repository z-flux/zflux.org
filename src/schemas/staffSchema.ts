import * as z from 'zod' 


export const staff =z.object({
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    branch_id:z.string().nonempty("branch is required"),
    username:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    phone:z.string().nonempty('phone is required').regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
    email: z.string().email("Invalid email address"),
    pin_code:z.string().length(4).regex(/^[0-9]{4}$/,'invalid pin code'),
    password:z.string().nonempty("password is required"),
    is_active:z.boolean().optional()
})

export type StaffScheme = z.infer<typeof staff>