import { z } from "zod";

export const contactSchema = z.object({
  user_name: z
    .string()
    .min(2, { message: "min_length_2" })
    .max(50, { message: "max_length_50" }),
  user_email: z.string().email({ message: "invalid_email" }),
  message: z
    .string()
    .min(10, { message: "min_length_10" })
    .max(500, { message: "max_length_500" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
