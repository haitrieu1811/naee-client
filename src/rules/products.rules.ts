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

export const productSchema = z.object({})
