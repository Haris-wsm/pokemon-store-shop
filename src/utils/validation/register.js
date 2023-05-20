import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string({ required_error: "อีเมลจำเป็น" })
    .min(1, { message: "อีเมลจำเป็น" })
    .email({ message: "อีเมลไม่ถูกต้อง" }),

  name: z
    .string({ required_error: "ชื่อจำเป็น" })
    .min(1, { message: "ชื่อความยาวอย่างน้อย 1 อักขระ" }),
  lastname: z
    .string({ required_error: "นามสกุล" })
    .min(1, { message: "นามสกุลความยาวอย่างน้อย 1 อักขระ" }),
  password: z
    .string({ required_error: "รหัสผ่านจำเป็น" })
    .min(8, { message: "รหัสผ่านความยาวอย่างน้อย 8 ตัว" }),
  // address: z.string(),
  // city: z.string().optional(),
  // zip: z.string().optional(),
  // province: z.string().optional(),
  // amphoe: z.string().optional(),
  // district: z.string().optional(),
});
