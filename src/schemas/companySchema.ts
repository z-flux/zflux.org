import { z } from "zod"

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(6, "Invalid phone number"),

  address: z
    .string()
    .min(5, "Address is required"),

  website: z
    .string()
    .url("Invalid website URL")
    .optional()
    .or(z.literal("")), // allows empty string

  tax_number: z
    .string()
    .min(3, "Tax number is required"),

  commercial_register: z
    .string()
    .min(3, "Commercial register is required"),

  status: z.enum(["active", "inactive", "suspended"]),

  subscription_plan: z.enum([
    "basic",
    "pro",
    "enterprise"
  ]),

subscription_start: z
  .string()
  .min(1, "Subscription start is required"),

subscription_end: z
  .string()
  .min(1, "Subscription end is required"),

  max_users: z
    .number()
    .int()
    .positive("Must be greater than 0"),

  max_branches: z
    .number()
    .int()
    .nonnegative(),

  multi_branch: z.boolean(),

  currency: z
    .string()
    .length(3, "Currency must be 3-letter ISO code"),

  timezone: z.string().min(1, "Timezone is required"),

  language: z.string().min(2),

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
,

  notes: z
    .string()
    .max(500)
    .optional()
}).refine((data) => {
  const start = new Date(data.subscription_start)
  const end = new Date(data.subscription_end)
  return end > start
}, {
  message: "Subscription end must be after start",
  path: ["subscription_end"],
})

  export type CompanyFormValues = z.infer<typeof companySchema>