import * as z from 'zod' 


export const customer =z.object({
    company_id:z.number().nonnegative().nonoptional(),
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    phone:z.string().nonempty('phone is required').regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
    email: z.string().email("Invalid email address"),
})

export type CustomerScheme = z.infer<typeof customer>
