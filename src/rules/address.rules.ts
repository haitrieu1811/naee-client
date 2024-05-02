import z from 'zod'

import { usersSchema } from '@/rules/users.rules'
import { AddressType } from '@/constants/enum'

export const addressSchema = z.object({
  provinceId: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  districtId: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  wardId: z.string().min(1, 'Vui lòng chọn phường/xã'),
  specificAddress: z.string().min(1, 'Vui lòng nhập địa chỉ cụ thể'),
  type: z.enum([AddressType.Home.toString(), AddressType.Office.toString()])
})

export const createAddressSchema = addressSchema
  .pick({
    provinceId: true,
    districtId: true,
    wardId: true,
    specificAddress: true,
    type: true
  })
  .and(
    usersSchema.pick({
      phoneNumber: true,
      fullName: true
    })
  )

export type CreateAddressSchema = z.infer<typeof createAddressSchema>
