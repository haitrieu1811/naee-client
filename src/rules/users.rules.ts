import z from 'zod'

import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/constants/regex'

export const userSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email không hợp lệ'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có độ dài từ 8 đến 32 ký tự')
    .max(32, 'Mật khẩu phải có độ dài từ 8 đến 32 ký tự'),
  confirmPassword: z.string().min(1, 'Vui lòng nhập lại mật khẩu'),
  phoneNumber: z.string().regex(PHONE_NUMBER_REGEX, 'Số điện thoại không hợp lệ'),
  fullName: z.string().min(1, 'Tên phải tối thiểu 1 ký tự')
})

export const registerSchema = userSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại mật khẩu không chính xác',
    path: ['confirmPassword']
  })

export const loginSchema = userSchema.pick({
  email: true,
  password: true
})

export const updateMeSchema = userSchema.pick({
  phoneNumber: true,
  fullName: true
})

export const changePasswordSchema = userSchema
  .pick({
    password: true,
    confirmPassword: true
  })
  .extend({
    oldPassword: z
      .string()
      .min(8, 'Mật khẩu cũ phải có độ dài từ 8 đến 32 ký tự')
      .max(32, 'Mật khẩu cũ phải có độ dài từ 8 đến 32 ký tự')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại mật khẩu không chính xác',
    path: ['confirmPassword']
  })

export const forgotPasswordSchema = userSchema.pick({
  email: true
})

export const resetPasswordSchema = userSchema
  .pick({
    password: true,
    confirmPassword: true
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại mật khẩu không chính xác',
    path: ['confirmPassword']
  })

export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type UpdateMeSchema = z.infer<typeof updateMeSchema>
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
