import * as z from 'zod'

export const branchSchema = z.object({
    company_id:z.number().nonnegative().nonoptional(),
    name: z.string().nonempty('name is required').min(3, "Name must be at least 3 characters"),
    code:z.string().nonempty('code is required').min(3, "Code must be at least 3 characters"),
    email: z.string().nonempty('email is required').email("Invalid email address"),
    phone:z.string().nonempty('phone is required').regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
    address:z.string().nonempty('address is required').min(3, "address must be at least 3 characters"),
    city:z.string().nonempty('city is required').min(3, "city must be at least 3 characters"),
    country:z.string().nonempty('country is required').min(3, "country must be at least 3 characters"),
    postal_code:z.number().nonnegative().nonoptional(),
    is_main:z.boolean(),
    status:z.string().min(3, "status must be at least 3 characters").nonempty('status is required'),
    manager_name: z.string().nonempty('manager name is required').min(3, "manager Name must be at least 3 characters"),
    manager_phone:z.string().nonempty('manager phone is required').regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
    opening_time:z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,"Invalid time, time must be in the format: HH:MM:SS"),
    closing_time:z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,"Invalid time, time must be in the format: HH:MM:SS"),
    timezone:z.string().nonempty('timezone is required').min(2, "timezone must be at least 2 characters"),
    currency:z.string().nonempty('currency is required').min(2, "currency must be at least 2 characters"),
    tax_rate:z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a number with up to 2 decimal places"),
    settings: z
      .array(
        z.object({
          key: z
            .string()
            .min(1, "Setting name is required"),
          value: z.boolean()
        })
      )
      .min(1, "At least one setting is required")
      .refine(
        (settings) =>
          new Set(settings.map(s => s.key)).size === settings.length,
        {
          message: "Setting names must be unique",
          path: ["settings"]
        }
      )
    
})

export type BranchSchema = z.infer<typeof branchSchema>