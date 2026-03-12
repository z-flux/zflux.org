import * as z from 'zod' 


export const shift =z.object({
    branch_id:z.string().nonempty("Branch is required"),
    name:z.string().nonempty('Name is required').min(3,'minimum length is 3 charachters'),
    start_time:z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/,"Invalid time, time must be in the format: HH:MM"),
    end_time:z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/,"Invalid time, time must be in the format: HH:MM"),
    is_active:z.boolean()
})

export type ShiftScheme = z.infer<typeof shift>