import z from 'zod'

import { ProductDiscountType, ProductStatus } from '@/constants/enum'
import { NUMBER_REGEX } from '@/constants/regex'

export const productCategorySchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên danh mục sản phẩm'),
  description: z.string().optional()
})

export const createProductCategorySchema = productCategorySchema.pick({
  name: true,
  description: true
})

export type CreateProductCategorySchema = z.infer<typeof createProductCategorySchema>

export const brandSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên nhãn nhiệu'),
  nation: z.string().min(1, 'Vui lòng nhập tên quốc gia nhãn nhiệu'),
  description: z.string().optional()
})

export const createBrandSchema = brandSchema.pick({
  name: true,
  nation: true,
  description: true
})

export type CreateBrandSchema = z.infer<typeof createBrandSchema>

export const productSchema = z.object({
  productCategoryId: z.string().min(1, 'Vui lòng chọn danh mục sản phẩm'),
  brandId: z.string().min(1, 'Vui lòng chọn nhãn hiệu'),
  name: z.string().min(1, 'Vui lòng nhập tên sản phẩm'),
  description: z.string().min(1, 'Vui lòng nhập mô tả sản phẩm'),
  status: z.enum([ProductStatus.Active.toString(), ProductStatus.Inactive.toString()]),
  availableCount: z.string().regex(NUMBER_REGEX, 'Vui lòng nhập số'),
  price: z.string().regex(NUMBER_REGEX, 'Vui lòng nhập số'),
  discountType: z.enum([ProductDiscountType.Money.toString(), ProductDiscountType.Percent.toString()]),
  discountValue: z.string().regex(NUMBER_REGEX, 'Vui lòng nhập số')
})

export const createProductSchema = productSchema.pick({
  productCategoryId: true,
  brandId: true,
  name: true,
  description: true,
  status: true,
  availableCount: true,
  price: true,
  discountType: true,
  discountValue: true
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
