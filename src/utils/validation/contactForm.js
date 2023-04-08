import { z } from "zod";

export const validationSchema = z.object({
  username: z
    .string({ required_error: "ชื่อจำเป็น" })
    .min(1, { message: "ชื่อจำเป็น" }),
  email: z
    .string({ required_error: "อีเมลจำเป็น" })
    .email({ message: "อีเมลไม่ถูกต้อง" }),
  message: z
    .string({ required_error: "ข้อความจำเป็น" })
    .min(1, { message: "ข้อความจำเป็น" }),
  title: z
    .string({ required_error: "หัวข้อเรื่องจำเป็น" })
    .min(5, { message: "หัวข้อเรื่องความยาวอย่างน้อย 5 อักขระ" }),
  policy: z.boolean({}).refine((val) => val === true, {
    message: "กรุณายืนยันข้อยอมรับ Privacy Policy",
  }),
});
