import * as z from 'zod' 


export const update =z.object({
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    subscriptionPlan:z.string().nonempty('subscriptionPlan is required'),
    maxUsers:z.string().nonempty('maximum users is required'),
})

export type UpdateScheme = z.infer<typeof update>