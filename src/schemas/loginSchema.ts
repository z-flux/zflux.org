import * as z from 'zod' 


export const login =z.object({
    email:z.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'invalid email'),
    password:z.string().nonempty('Password is required')//.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password must have at least one lowercase letter, one uppercase letter, one digit, one special character from the set @$!%*?&, and a minimum length of 8 characters')
})

export type loginScheme = z.infer<typeof login>