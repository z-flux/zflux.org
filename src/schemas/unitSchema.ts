import * as z from 'zod' 


export const unit =z.object({
   name:z.string().nonempty("name is required"),
   type:z.string().nonempty("type is required"),
   symbol:z.string().nonempty("symbol is required"),
})

export type UnitScheme = z.infer<typeof unit>