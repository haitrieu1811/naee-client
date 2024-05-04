import z from 'zod'

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

export const productSchema = z.object({})
