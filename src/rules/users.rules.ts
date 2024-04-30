import z from 'zod'

import { EMAIL_REGEX } from '@/constants/regex'

export const usersSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email không hợp lệ'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có độ dài từ 8 đến 32 ký tự')
    .max(32, 'Mật khẩu phải có độ dài từ 8 đến 32 ký tự')
})

export const registerSchema = usersSchema
  .pick({
    email: true,
    password: true
  })
  .extend({
    confirmPassword: z.string().min(1)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại mật khẩu không chính xác',
    path: ['confirmPassword']
  })

export const loginSchema = usersSchema.pick({
  email: true,
  password: true
})

export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>
