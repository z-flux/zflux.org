import * as z from 'zod'

export const userSchema = z.object({
    name: z.string().nonempty('name is required').min(3, "Name must be at least 3 characters"),
    
    email: z.string().nonempty('email is required').email("Invalid email address"),
    password:z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password must have at least one lowercase letter, one uppercase letter, one digit, one special character from the set @$!%*?&, and a minimum length of 8 characters'),
    password_confirmation:z.string().nonempty('password confirmation is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password must have at least one lowercase letter, one uppercase letter, one digit, one special character from the set @$!%*?&, and a minimum length of 8 characters'),
    phone:z.string().nonempty('phone is required').regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
    company_id:z.number().nonnegative().nonoptional(),
    branch_id:z.number().nonnegative().nonoptional(),
    hire_date:z.string().nonempty('hire date is required'),
    salary:z.number().nonnegative().nonoptional(),
    status:z.string().min(3, "status must be at least 3 characters").nonempty('status is required'),
    settings: z
      .array(
        z.object({
          key: z
            .string()
            .min(1, "Setting name is required"),
          value: z.string().nonempty('value is required')
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
    
}).refine(
  (data) => data.password === data.password_confirmation,
  {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  }
)

export type UserSchema = z.infer<typeof userSchema>